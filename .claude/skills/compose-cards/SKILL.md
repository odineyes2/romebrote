---
name: compose-cards
description: cards/와 images/의 내용을 합쳐 텍스트가 입혀진 최종 카드뉴스 이미지를 만든다. 텍스트와 이미지를 합쳐달라고 할 때 사용.
---

# 카드뉴스 최종 합성

## 작업 순서

1. cards/와 images/ 폴더에서 $ARGUMENTS와 일치하는 슬러그를 찾는다.
2. card-composer 서브에이전트에게 전달해 합성하게 한다.
3. 결과 경로를 보고한다.
