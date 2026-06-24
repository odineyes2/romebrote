---
name: write-blog-post
description: 주어진 주제로 블로그 글 초안을 작성해서 drafts/ 폴더에 저장하고 검토 후 posts/로 승인한다. 사용자가 블로그 글을 써달라고 할 때 사용.
---

# 블로그 글 작성

주어진 주제로 블로그 글 초안을 작성한다.

분량·톤·구조 기준은 blog-researcher, blog-writer, blog-reviewer 에이전트 정의를 따르며, 이 스킬에서 별도로 규정하지 않는다.

## 작업 순서

1. **리서치**: blog-researcher 서브에이전트에게 주제를 전달해 `briefs/{slug}.md`를 작성하게 한다.
2. **집필**: blog-writer 서브에이전트에게 브리프 파일 경로를 전달해 `drafts/{slug}.md`를 작성하게 한다.
3. **검토**: blog-reviewer 서브에이전트에게 초안 검토를 요청한다.
   - 승인 → `posts/`로 이동됨. 다음 단계로.
   - 문제 있음 → 피드백을 blog-writer에게 전달해 수정하게 하고 다시 검토받는다.
4. **Notion 업로드**: notion-uploader 서브에이전트에게 `posts/{slug}.md` 경로를 전달해 Notion Content Pipeline 데이터베이스에 업로드하게 한다.
5. 최대 2회 수정 후에도 검토 통과 못하면 남은 문제를 사람에게 보고하고 멈춘다.
