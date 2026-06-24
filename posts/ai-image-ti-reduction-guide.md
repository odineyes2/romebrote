---
title: AI 이미지 "티" 줄이기: 더 완벽하게 말고, 의도적으로 불완전하게
slug: ai-image-ti-reduction-guide
date: 2026-06-24
category: 기술현황
tags: [AI이미지, AI티줄이기, AI아티팩트, 네거티브프롬프트, img2img, diffusion모델]
description: AI 이미지에서 "티"가 나는 기술적 원인을 diffusion model 구조로 분석하고, 프롬프트 수정·모델 설정·후처리 그레인 추가의 3단계 워크플로우로 자연스러운 결과를 만드는 실전 가이드.
hero_image: 같은 인물 얼굴 이미지 두 장 나란히 — 왼쪽은 AI 특유의 과도하게 매끄러운 피부, 오른쪽은 필름 그레인과 미세 모공이 추가된 자연스러운 버전. 배경에 "before / after" 레이블.
sources:
  - https://arxiv.org/abs/2502.11989
  - https://www.cloudretouch.com/de-plasticize-ai-skin-texture-photoshop/
  - https://hailuoai.video/pages/knowledge/subsurface-scattering-ai-skin-realism-master-guide
  - https://techcrunch.com/2025/04/03/midjourney-releases-its-first-new-ai-image-model-in-nearly-a-year/
  - https://venturebeat.com/ai/black-forest-labs-releases-flux-1-1-pro-and-an-api
  - https://bfl.ai/flux-1-1-ultra/
  - https://openai.com/index/introducing-4o-image-generation/
  - https://vertu.com/ai-tools/the-2025-reality-check-on-ai-generated-hands-and-fingers/
  - https://zsky.ai/blog/why-ai-images-look-bad
  - https://www.1bit.ai/blog/fix-ai-image-artifacts-troubleshooting-guide
  - https://pxz.ai/blog/best-negative-prompts-for-realistic-ai-images
  - https://www.lovart.ai/blog/perfect-imperfection-add-grain-noise-natural-ai
  - https://stable-diffusion-art.com/flux-img2img-inpainting/
  - https://www.eyesift.com/ai-image-detection-2026-c2pa-content-credentials-synthid-watermarks-diffusion-fingerprints-deepfake/
  - https://goldpenguin.org/blog/midjourney-v7-review/
  - https://pxlpeak.com/blog/ai-tools/midjourney-vs-dall-e-vs-flux-comparison

---

AI 이미지를 더 정교하게 만들수록 오히려 더 AI처럼 보이는 경험, 한 번쯤 해봤을 것이다. 프롬프트를 공들여 다듬고 해상도를 높였는데도 결과물은 여전히 "뭔가 이상한" 피부, 완벽하지만 죽어있는 눈동자, 지나치게 균일한 조명을 달고 나온다. 이 글은 그 이유를 기술적으로 짚고, "더 잘 만드는 것"이 아니라 **의도적으로 불완전하게 만드는 역발상 워크플로우**를 단계별로 제시한다.

[IMG: AI 이미지 비교 — 왼쪽: 과도하게 매끄러운 AI 피부 클로즈업, 오른쪽: 필름 그레인과 미세 텍스처가 추가된 동일 구도. 라벨 "over-smoothed vs. intentionally imperfect"]

---

## "티"가 나는 건 실력 문제가 아니라 구조 문제다

AI 이미지에 티가 나는 근본 원인은 diffusion model이 학습한 데이터의 편향에 있다. denoising 알고리즘은 잡음을 제거하면서 이미지를 생성하는데, 학습 데이터에 보정(retouch)된 사진이 대량 포함되어 있다. 모델이 "매끄러운 피부 = 고품질"로 학습한 결과, 모공·미세 주름·솜털·색소 불균일처럼 **5~20픽셀 규모의 mid-frequency 디테일**이 체계적으로 소거된다. 뇌는 이 공백을 언캐니 밸리로 인식한다.

2025년 CHI 학회 논문(arxiv 2502.11989)은 diffusion model 아티팩트를 크게 두 범주로 분류했다. 해부학적 비현실성(anatomical implausibilities)과 양식적 아티팩트(stylistic artifacts). 전자의 대표 사례가 손·손가락 오류이고, 후자가 바로 over-smoothing이다. 씬 복잡도와 인간 큐레이션 여부 모두 판별 정확도에 영향을 미친다고 논문은 분석한다.

모델별로 취약점의 위치는 다르다. **Midjourney v7**(2025년 4월 3일 출시, 6월 17일 기본 버전 전환)은 광환경·포컬 포인트에서 강하지만 텍스트 렌더링 오류율이 약 40%에 달하는 것으로 알려져 있다. **Flux 1.1 Pro**(Black Forest Labs, 2024년 10월 1일 출시)는 피부의 자연스러운 불완전함(정맥, 주름)을 상대적으로 잘 표현하지만, 10~15회 이상 반복 인페인팅 시 아티팩트가 누적된다. **GPT-4o 이미지 생성**(2025년 3월 도입, 이후 GPT Image 2로 업그레이드된 것으로 알려져 있다)은 Midjourney·Flux 대비 텍스트 오독 빈도가 낮다는 평가를 받지만 커스터마이징 폭이 좁다.

---

## 완벽함을 허용하지 않는 언어가 더 자연스러운 이미지를 만든다

가장 빠른 개선은 프롬프트에서 "불완전함을 허용하는 언어"를 추가하는 것이다.

**포지티브 프롬프트에 추가할 표현:**
```
subtle film grain, slight paper texture, matte finish,
no plastic-smooth surfaces, editorial photography style,
visible pores, natural skin imperfection, slight color variation
```

실제 필름 그레인이 있는 레퍼런스 이미지를 첨부하면 효과가 배가된다. 프롬프트 텍스트만으로 전달하는 것보다 시각적 참조가 모델을 더 강하게 끌어당긴다.

**네거티브 프롬프트(Stable Diffusion 계열 전용):**

Midjourney·Flux·GPT Image는 네거티브 프롬프트를 지원하지 않거나 지원이 제한적이다. SD 계열에서는 아래 스타터 세트를 기반으로 조정한다.

```
worst quality, low quality, blurry, jpeg artifacts, watermark,
signature, text, bad anatomy, bad hands, extra limbs, deformed, ugly
```

모델별 권장 분량이 다르다. SD 1.5는 15~30개 용어, SDXL은 5~15개, SD 3.5는 10개 미만이 적정하다. CFG scale이 12를 넘으면 네거티브 프롬프트는 3~5개로 줄이는 것이 효과적이라고 알려져 있다. CFG 12 이상에서 긴 네거티브 프롬프트를 쓰면 과포화가 발생해 역효과가 난다. 전략적으로 적용할 경우 이미지 충실도가 향상될 수 있다고 알려져 있다(zsky.ai).

---

## 손과 텍스트는 한 번에 고치려 할수록 실패한다

손·손가락 오류는 2025년 기준 최신 모델들이 크게 개선했지만 완전히 해결되지는 않았다. Midjourney v7은 복잡한 포즈에서 여전히 실패하고, Flux는 네거티브 프롬프트로 어느 정도 보완이 가능하다.

인페인팅 수정의 핵심 원칙은 세 가지다.

1. **부분 마스크로 재생성한다.** 손 수정 시 "Only masked" 모드에서 512×512로 재생성한다. 전체 이미지를 인페인팅하는 것보다 디테일이 훨씬 잘 살아난다.
2. **원본 모델의 인페인팅 변형을 쓴다.** 생성에 쓴 모델과 다른 모델로 인페인팅하면 스타일 불일치가 발생한다.
3. **한 번에 하나씩 수정한다.** 손 → 얼굴 → 배경 순서로 각각 따로 진행한다. 한 패스에 여러 요소를 동시에 수정하면 아티팩트가 복합 발생한다.

텍스트가 포함된 이미지라면 모델 선택이 먼저다. 텍스트 전용 생성에 강점이 있다고 알려진 Ideogram 2.0과 GPT-4o Image가 현실적인 대안이다. Midjourney에서 텍스트를 넣으려 하면 오독이 빈번하게 발생한다고 알려져 있다.

실전에서 권장하는 흐름은 **분리 생성**이다. Midjourney나 Flux로 배경과 인물 구도를 먼저 완성한 뒤, 텍스트 레이어만 Ideogram 2.0이나 GPT-4o Image로 별도 생성해 Photoshop에서 합성한다. 하나의 프롬프트로 텍스트와 이미지를 동시에 생성하려 하면 두 가지 모두 타협점에 머문다. 썸네일·포스터처럼 가독성이 중요한 텍스트가 포함된 결과물일수록 이 분리 워크플로우의 효과가 크다.

[IMG: 손가락 인페인팅 비교 — 왼쪽: 원본 AI 이미지의 손(손가락 6개 또는 뒤틀린 관절), 오른쪽: "Only masked 512×512" 인페인팅 후 수정된 손. Flux 1.1 스타일]

---

## 후처리 그레인: AI 티를 역방향으로 지운다

프롬프트와 인페인팅으로도 남아있는 "과도한 완벽함"은 포스트 프로세싱에서 필름 그레인을 더하는 것으로 희석한다.

Lightroom이나 Photoshop에서 그레인 레이어를 추가할 때 강도는 10~100% 범위에서 조절한다. 과도하게 적용하면 세부 텍스처가 뭉개질 수 있으니 20~40% 수준을 출발점으로 삼는 것을 권장한다(lovart.ai).

Lightroom의 **AI Denoise**는 반대 용도로도 쓸 수 있다. 원클릭으로 노이즈를 제거한 뒤 DNG 파일로 출력하면 피부 텍스처와 패브릭 디테일이 보존된다. 작업 순서는 노이즈 제거 → 샤프닝이다. 반대로 하면 아티팩트가 오히려 증폭된다.

Flux 1.1의 Redux 기능을 활용하면 한 단계 더 나아갈 수 있다. 원본 이미지와 새 프롬프트를 함께 입력하면 구도·조명·색상은 유지하면서 지정한 디테일만 재확산한다. 스타일은 건드리지 않고 아티팩트만 제거하는 img2img 워크플로우가 가능해진다.

---

## 모델마다 약점이 다르고, 대응 전략도 달라야 한다

결함 유형과 사용 모델을 먼저 진단한 뒤, 해당 조합에 맞는 대응을 선택해야 한다. 동일한 과보정 피부 문제도 Midjourney에서는 프롬프트 언어 교체가 우선이고, Flux에서는 후처리 그레인 추가가 더 빠른 해결책이다.

| 결함 유형 | 취약 모델 | 권장 대응 |
|---|---|---|
| 과도한 피부 매끄러움 | Midjourney v7, SDXL | 프롬프트에 grain·pore 표현 추가, 후처리 그레인 20~40% |
| 손·손가락 오류 | 모든 모델(정도 차이 있음) | Only masked 512×512 인페인팅, 한 번에 하나씩 |
| 텍스트 깨짐 | Midjourney(텍스트 취약), Flux(장문) | Ideogram 2.0 또는 GPT-4o Image로 교체 |
| 조명·물리 오류 | Midjourney v7(복잡한 씬) | 씬 단순화, 오브젝트 수 줄이기 |
| 아티팩트 누적 | Flux 1.1(반복 인페인팅) | 이터레이션 10회 미만 유지, 중간에 원본 저장 |

표의 "권장 대응"은 출발점이지 고정값이 아니다. 같은 결함 유형도 이미지 구성과 목적에 따라 다른 접근이 필요할 수 있다. 중요한 것은 결함을 발견했을 때 곧바로 프롬프트를 수정하기보다 먼저 어느 단계의 문제인지를 진단하는 습관이다.

---

AI 이미지의 "티"는 결국 모델이 "현실보다 더 완벽한 현실"을 학습한 결과다. 역설적이게도, 그 티를 지우는 가장 효과적인 방법은 그레인을 더하고, 모공을 살리고, 렌즈 수차를 흉내 내는 것이다. 완벽함을 향해 달리는 방향을 한 번 뒤집어보면, 결과물이 달라진다.
