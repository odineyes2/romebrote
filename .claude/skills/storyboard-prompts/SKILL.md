---
name: storyboard-prompts
description: cards/ 폴더의 카드뉴스로 이미지 생성 프롬프트만 작성한다 (실제 이미지 생성은 안 함). 스토리보드 프롬프트 만들어달라고 할 때 사용.
---

# 스토리보드 프롬프트 작성

## 작업 순서

1. cards/ 폴더에서 $ARGUMENTS와 일치하는 카드뉴스를 찾는다.
2. storyboard-prompt-writer 서브에이전트에게 전달해 카드별 이미지 프롬프트를 작성하게 한다.
3. 저장 경로를 보고한다.
