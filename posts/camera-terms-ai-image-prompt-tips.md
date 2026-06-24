---
title: AI 이미지 프롬프트에서 카메라 용어 쓰는 법 — 작동하는 것과 안 하는 것
slug: camera-terms-ai-image-prompt-tips
date: 2026-06-24
category: 창작팁
tags:
  - AI이미지프롬프트
  - 카메라용어
  - Midjourney
  - Flux
  - 필름스톡
  - 조리개값
description: AI 이미지 프롬프트에서 85mm, f/1.8, Kodak Portra 400 같은 카메라 용어가 왜 작동하는지, 그리고 셔터스피드 수치처럼 실제로는 효과가 없는 용어는 무엇인지 실전 가이드로 정리했다.
hero_image: 흑백 필름카메라 옆에 AI 생성 이미지가 나란히 놓인 구성 — "shot on 35mm film, Ilford HP5, f/2.8, high contrast monochrome photography"
sources:
  - https://freeaipromptmaker.com/blog/2026-02-16-master-ai-art-lenses-prompts-guide
  - https://idacooper.medium.com/a-vocabulary-for-camera-position-angle-framing-and-perspective-for-ai-image-generation-fcbd78478022
  - https://aivideobootcamp.com/blog/photorealistic-ai-prompts-guide-2026/
  - https://sciencespark.blog/unlock-pro-ai-photos-guide-sd-prompt-focal-length
  - https://kidnihon.com/en/technology/ai-image-generation-in-2026-midjourney-v8-flux2-gpt-image-15-stable-diffusion-4
  - https://wavespeed.ai/blog/posts/midjourney-v8-vs-flux-vs-sora-best-ai-image-generator-2026/
  - https://www.dataskater.com/midjourney/how-to-prompt-midjourney-for-famous-35mm-film-styles-velvia-superia-kodak-and-more/
  - https://apostle.io/courses/ai-creative-director/camera-and-lighting/
  - https://blog.designhero.tv/ai-art-direction-prompts-flux-midjourney/
  - https://www.whytryai.com/p/midjourney-photography-terms
  - https://civitai.com/articles/11432/ultimate-guide-to-creating-realistic-sdxl-prompts
  - https://www.ecomtent.ai/blog-page/the-impact-of-prompting-different-camera-lenses-in-ai-image-generation
  - https://nightjar.so/blog/prompt-patterns-realistic-ai-product-photos
  - https://medium.com/@robertgo8/the-complete-guide-to-crafting-professional-midjourney-photography-prompts-e16c413c07d5
  - https://aitoolsdevpro.com/ai-tools/adobe-firefly-guide/
---

"고급스러운 느낌의 인물 사진"이라고 프롬프트를 써도 AI가 원하는 그림을 뽑지 못한 적이 있다면, 언어가 아니라 언어의 종류가 문제였을 가능성이 높다. AI 이미지 모델은 수백만 장의 EXIF 태그가 붙은 사진 데이터로 훈련됐다. 그 말은 "85mm f/1.8 Kodak Portra 400"처럼 촬영 스펙을 그대로 쓰면 AI가 그 조합에 해당하는 시각적 패턴을 훈련 데이터에서 직접 꺼낸다는 뜻이다. 감성 묘사는 AI를 설득하지 못한다. 촬영 스펙이 AI의 언어다. 단, 카메라 수치라고 모두 작동하지는 않는다. 어떤 용어가 효과를 내고, 어떤 수치가 그냥 무시되는지를 구분하는 것이 실전의 핵심이다.

---

## f-stop과 초점거리는 쓴다 — 단, 수치가 의미를 갖는 범위 내에서

초점거리와 조리개값은 AI 프롬프트에서 가장 신뢰도 높게 작동하는 카메라 용어다. 모델이 훈련 데이터의 EXIF 정보를 통해 각 수치가 어떤 광학적 결과를 만드는지 학습했기 때문이다.

초점거리별 효과를 정리하면 다음과 같다.

| 초점거리 | 시각적 효과 |
|---------|------------|
| 24mm | 넓은 환경 묘사, 드라마틱한 원근감 과장 |
| 50mm | 인간의 눈에 가장 자연스러운 원근감 (표준 렌즈) |
| 85mm | 인물에 최적, 아첨하는 원근감, 배경 분리감 |
| 135mm | 배경 압축 효과, 피사체 고립 |
| 200mm 이상 | 극단적 배경 압축, 피사체 강한 고립 |

조리개값도 마찬가지다. **f/1.4~f/1.8**은 배경을 강하게 뭉개는 보케 효과를, **f/8~f/11**은 전체 구도를 선명하게 유지하는 풍경 사진 심도를 유도한다. 활용 예시를 보면 차이가 바로 보인다.

> `Shallow depth of field (f/1.8), subject in sharp focus, bokeh background`

이 문장 하나로 배경 흐림의 강도와 피사체 선명도를 동시에 제어할 수 있다.

[IMG: 85mm f/1.8과 24mm f/8로 생성한 인물 사진 나란히 비교 — "portrait of a woman, 85mm f/1.8, shallow depth of field, bokeh" vs "portrait of a woman, 24mm f/8, sharp landscape background, environmental portrait"]

---

## 셔터스피드 수치는 쓰지 않는다 — 서술로 대체하라

여기서 많은 사람이 실수를 한다. "f/1.8이 작동하니까 1/1000s도 될 거야"라고 생각하는 것이다. Midjourney 커뮤니티 사례 기준으로, 셔터스피드 수치를 직접 입력해도 예측 가능한 결과를 보장하지 않는다. 1/1000s라고 써도 AI가 이를 어떤 시각적 특성으로 변환할지 일관된 처리가 이루어지지 않는다.

대신 결과를 묘사하는 언어가 훨씬 효과적이다.

- 원하는 것: 빠른 셔터 → `high-speed photography`, `motion frozen`
- 원하는 것: 긴 노출 → `long exposure shot`, `light trails`
- 원하는 것: 피사체 흐림 → `motion blur`, `panning shot`
- 원하는 것: 줌 효과 → `zoom-burst`

ISO 수치도 비슷한 상황이다. "ISO 6400"을 쓰는 것보다 `film grain`, `high ISO look`, `clean low-light` 같은 결과 묘사가 더 직관적으로 작동한다는 사례가 많다. 다만 ISO 수치 직접 입력과 서술형 표현 간의 정량적 비교 데이터는 현재 확인되지 않은 상태다.

렌즈 종류 자체를 명시할 때도 수치가 아닌 특성 서술이 효과적이다. `Macro lens`는 극단적 클로즈업과 높은 배율을, `Fisheye lens`는 180도 초광각 왜곡을, `Tilt-shift lens`는 미니어처 효과를, `Anamorphic lens`는 영화적 화면비와 타원형 보케를 유도한다. 특히 `Anamorphic lens`는 프롬프트 하나로 시네마틱 플레어까지 동시에 얻을 수 있어 자주 쓰인다.

---

## 필름 스톡 이름은 색상 과학을 통째로 불러온다

필름 스톡명은 단순한 레트로 감성 키워드가 아니다. AI 모델은 필름 스톡별로 색상 과학, 그레인 특성, 대비, 하이라이트 롤오프를 다르게 처리한다. 네 가지 필름 스톡이 만드는 결과는 명확하게 구분된다.

- **Kodak Portra 400**: 따뜻한 피부 톤, 파스텔 하이라이트 롤오프, 아날로그적 온기. `fine grain visible, soft pastel highlight rolloff`를 함께 쓰면 효과가 강해진다.
- **Fuji Velvia 50**: 채도가 강한 그린과 레드, 펀치감 있는 컬러. 풍경 사진에 적합.
- **Cinestill 800T**: 텅스텐 조명의 도시 야경, 핑크빛 할레이션 번짐 효과.
- **Ilford HP5**: 고대비 흑백, 세련된 모노크롬.

필름 스톡은 사실상 stylize 설정을 재정의하는 효과가 있다. 전체 이미지의 색 분위기를 일관되게 잡고 싶을 때, 필름 스톡 한 줄이 색상 보정 설명 열 줄을 대체한다.

[IMG: 같은 피사체(도시 야경 인물)를 Kodak Portra 400과 Cinestill 800T로 각각 생성한 비교 이미지]

---

## 모델마다 같은 용어를 다르게 처리한다

카메라 용어를 어느 도구에 쓰느냐도 결과를 가른다. 2026년 6월 기준 주요 모델의 기술 용어 반응도는 다음과 같다.

| 모델 | 기술 용어 반응도 | 특이사항 |
|------|----------------|---------|
| Flux 2 Pro | 가장 높음 | 카메라 기종, 렌즈 스펙, f-stop 수치에 직접 반응. wavespeed.ai 비교에 따르면 사진적 사실주의 부문에서 상위권으로 알려져 있다. |
| Midjourney V7/V8 | 높음 (서술 선호) | 수치보다 묘사적 표현이 효과적. V8.1은 2026년 4월 출시, HD 모드·샤프한 텍스처 지원. |
| Stable Diffusion 3.5 | 중간 | 사실주의 체크포인트와 함께 쓸 때 효과 증가. |
| Adobe Firefly (Image Model 4/5) | 중간~높음 | 조명 관련 용어(Rembrandt lighting, Softbox)에 특히 강함. |

Flux 2 Pro는 "85mm at f/2.8"처럼 수치형 스펙을 명시적 언어로 처리하는 경향이 있다. Midjourney V8은 동일한 수치보다 "soft bokeh portrait" 같은 서술이 더 일관된 결과를 낸다. 도구를 바꿀 때 프롬프트 전략도 함께 바꿔야 하는 이유다.

---

## 프롬프트를 쓰는 순서 하나로 정리하면

브리프에서 확인된 효과적인 프롬프트 구조는 다음 순서를 따른다.

```
[피사체] + [장면/배경] + [조명] + [카메라 설정] + [앵글] + [분위기] + [필름 스톡/렌더링 키워드]
```

실전 예시:

> `Portrait of a woman, urban street background, golden hour backlight, shot on Canon EOS R5 with 85mm f/1.4 lens, shallow depth of field, cinematic color grading, Kodak Portra 400`

이 구조에서 카메라 설정과 필름 스톡은 각각 독립적으로 작동하면서 서로를 보강한다. 85mm f/1.4가 공간감을 만들고, Kodak Portra 400이 색을 잡는다.

---

"예쁜 사진"이라는 지시어 대신 "85mm f/1.8, Kodak Portra 400, golden hour"라고 쓰는 순간, AI는 수십만 장의 훈련 이미지에서 그 조합에 해당하는 패턴을 꺼낸다. 지금 당장 써온 프롬프트에서 감성 묘사 하나를 지우고 초점거리 하나를 넣어보는 것이 시작점이다.
