---
name: notion-upload
description: "posts/ 폴더의 특정 파일을 Notion Content Pipeline 데이터베이스에 업로드한다. $ARGUMENTS에 slug를 넘기면 해당 파일을, 없으면 camera-terms-ai-image-prompt-tips를 기본값으로 사용한다."
---

# Notion 업로드

## 작업 순서

1. `$ARGUMENTS`가 있으면 `posts/{$ARGUMENTS}.md`를, 없으면 `posts/camera-terms-ai-image-prompt-tips.md`를 대상 파일로 정한다.
2. notion-uploader 서브에이전트에게 해당 파일 경로를 전달해 Notion Content Pipeline에 업로드하게 한다.
3. 반환된 Notion 페이지 URL 또는 오류 내용을 그대로 보고한다.
