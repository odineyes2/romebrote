#!/usr/bin/env node
// Usage: node scripts/notion-upload.mjs posts/{slug}.md

import fs from 'fs';
import path from 'path';

const API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!API_KEY) { console.error('NOTION_API_KEY 환경변수가 없습니다.'); process.exit(1); }
if (!DATABASE_ID) { console.error('NOTION_DATABASE_ID 환경변수가 없습니다.'); process.exit(1); }

const filePath = process.argv[2];
if (!filePath) { console.error('사용법: node scripts/notion-upload.mjs posts/{slug}.md'); process.exit(1); }

const raw = fs.readFileSync(path.resolve(filePath), 'utf8');

// --- frontmatter 파싱 ---
function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { fm: {}, body: content };
  const fm = {};
  for (const line of m[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (key) fm[key] = val;
  }
  return { fm, body: m[2].trim() };
}

function parseTags(str) {
  if (!str) return [];
  return str.replace(/[\[\]]/g, '').split(',').map(s => s.trim()).filter(Boolean);
}

// --- 인라인 마크다운 → Notion rich_text ---
function parseInline(text) {
  const parts = [];
  // bold, italic, inline code (순서 중요: bold before italic)
  const re = /(\*\*(.+?)\*\*|`(.+?)`|\*(.+?)\*|_(.+?)_)/g;
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: 'text', text: { content: text.slice(last, m.index) } });
    if (m[2] !== undefined) parts.push({ type: 'text', text: { content: m[2] }, annotations: { bold: true } });
    else if (m[3] !== undefined) parts.push({ type: 'text', text: { content: m[3] }, annotations: { code: true } });
    else if (m[4] !== undefined) parts.push({ type: 'text', text: { content: m[4] }, annotations: { italic: true } });
    else if (m[5] !== undefined) parts.push({ type: 'text', text: { content: m[5] }, annotations: { italic: true } });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', text: { content: text.slice(last) } });
  return parts.length ? parts : [{ type: 'text', text: { content: text } }];
}

// --- 마크다운 표 → Notion table 블록 ---
function parseTableRow(line) {
  return line.split('|').slice(1, -1).map(cell => cell.trim());
}

function isTableSeparator(cells) {
  return cells.every(cell => /^:?-+:?$/.test(cell));
}

function buildNotionTable(tableLines) {
  const rows = tableLines.map(parseTableRow);
  const hasSeparator = rows.length > 1 && isTableSeparator(rows[1]);
  const dataRows = hasSeparator
    ? [rows[0], ...rows.slice(2)]
    : rows;

  if (dataRows.length === 0) return null;
  const tableWidth = dataRows[0].length;

  return {
    type: 'table',
    table: {
      table_width: tableWidth,
      has_column_header: hasSeparator,
      has_row_header: false,
      children: dataRows.map(row => ({
        type: 'table_row',
        table_row: { cells: row.map(cell => parseInline(cell)) },
      })),
    },
  };
}

// --- 마크다운 바디 → Notion 블록 배열 ---
function markdownToBlocks(md) {
  const blocks = [];
  const lines = md.split('\n');
  let i = 0;
  let inCode = false;
  let codeLang = '';
  let codeLines = [];

  while (i < lines.length) {
    const line = lines[i];

    // 코드 블록
    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim() || 'plain text';
        codeLines = [];
      } else {
        inCode = false;
        blocks.push({
          type: 'code',
          code: { rich_text: [{ type: 'text', text: { content: codeLines.join('\n') } }], language: codeLang }
        });
      }
      i++; continue;
    }
    if (inCode) { codeLines.push(line); i++; continue; }

    // 이미지 마커 [IMG: ...]
    if (line.match(/^\[IMG:/)) {
      blocks.push({
        type: 'callout',
        callout: { rich_text: [{ type: 'text', text: { content: line } }], icon: { type: 'emoji', emoji: '🖼️' } }
      });
      i++; continue;
    }

    // 표: 연속된 | 행을 묶어서 Notion table 블록으로 변환
    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const tableBlock = buildNotionTable(tableLines);
      if (tableBlock) blocks.push(tableBlock);
      continue;
    }

    // 제목
    if (line.startsWith('# ')) {
      blocks.push({ type: 'heading_1', heading_1: { rich_text: parseInline(line.slice(2)) } });
    } else if (line.startsWith('## ')) {
      blocks.push({ type: 'heading_2', heading_2: { rich_text: parseInline(line.slice(3)) } });
    } else if (line.startsWith('### ')) {
      blocks.push({ type: 'heading_3', heading_3: { rich_text: parseInline(line.slice(4)) } });
    }
    // 구분선
    else if (line.match(/^---+$/)) {
      blocks.push({ type: 'divider', divider: {} });
    }
    // 불릿 리스트
    else if (line.match(/^[-*] /)) {
      blocks.push({ type: 'bulleted_list_item', bulleted_list_item: { rich_text: parseInline(line.slice(2)) } });
    }
    // 번호 리스트
    else if (line.match(/^\d+\. /)) {
      blocks.push({ type: 'numbered_list_item', numbered_list_item: { rich_text: parseInline(line.replace(/^\d+\. /, '')) } });
    }
    // 빈 줄 → 건너뜀
    else if (line.trim() === '') {
      // skip
    }
    // 일반 문단
    else {
      blocks.push({ type: 'paragraph', paragraph: { rich_text: parseInline(line) } });
    }

    i++;
  }
  return blocks;
}

// --- Notion API 호출 ---
async function notionFetch(endpoint, body) {
  const res = await fetch(`https://api.notion.com/v1${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion API 오류 ${res.status}: ${err}`);
  }
  return res.json();
}

async function main() {
  const { fm, body } = parseFrontmatter(raw);
  const tags = parseTags(fm.tags);
  const blocks = markdownToBlocks(body);

  // Notion API: 한 번에 최대 100블록
  const CHUNK = 100;
  const firstChunk = blocks.slice(0, CHUNK);

  const page = await notionFetch('/pages', {
    parent: { database_id: DATABASE_ID },
    properties: {
      Name: { title: [{ type: 'text', text: { content: fm.title || path.basename(filePath, '.md') } }] },
      Status: { select: { name: '초안' } },
      'Content Type': { select: { name: '블로그' } },
      Category: fm.category ? { select: { name: fm.category } } : undefined,
      Tags: tags.length ? { multi_select: tags.map(t => ({ name: t })) } : undefined,
      Slug: fm.slug ? { rich_text: [{ type: 'text', text: { content: fm.slug } }] } : undefined,
      Description: fm.description ? { rich_text: [{ type: 'text', text: { content: fm.description } }] } : undefined,
      Date: fm.date ? { date: { start: fm.date } } : undefined,
    },
    children: firstChunk,
  });

  // 100블록 초과 시 나머지 추가
  if (blocks.length > CHUNK) {
    for (let i = CHUNK; i < blocks.length; i += CHUNK) {
      await notionFetch(`/blocks/${page.id}/children`, {
        children: blocks.slice(i, i + CHUNK),
      });
    }
  }

  console.log(`OK|${page.url}|${page.id}`);
}

main().catch(e => { console.error(e.message); process.exit(1); });
