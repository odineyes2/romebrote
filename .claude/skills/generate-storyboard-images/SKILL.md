---
name: generate-storyboard-images
description: prompts/ 폴더의 이미지 프롬프트로 실제 이미지를 생성한다 (크레딧 소모). --limit=N으로 생성 장수를 제한할 수 있다. 사용자가 명시적으로 호출할 때만 사용.
disable-model-invocation: true
---

# 스토리보드 이미지 생성

## 작업 순서

1. $ARGUMENTS에서 "--limit=N" 패턴이 있으면 추출하고, 나머지를 검색 키워드로 쓴다. 없으면 제한 없이 전체 진행.
2. prompts/ 폴더에서 키워드와 일치하는 프롬프트 파일을 찾는다.
3. storyboard-illustrator 서브에이전트에게 전달해 (제한이 있으면 그 수만큼만) 이미지를 생성하게 한다.
4. 저장 경로를 보고한다.
