---
topic: AI 이미지에서 "AI 티"가 나는 시각적 특징의 기술적 원인과 이를 줄이는 방법
slug: ai-image-ti-reduction-guide
type: 창작팁
keywords:
  main: AI 이미지 티 줄이기
  sub:
    - AI 아티팩트
    - 네거티브 프롬프트
    - img2img 후처리
    - diffusion model 결함
    - 손가락 오류
---

## 확인된 핵심 팩트

### AI 이미지 아티팩트의 기술적 원인

- **과도한 매끄러움(over-smoothing)**: diffusion model의 denoising 알고리즘은 미세 피부 텍스처를 평균화한다. 학습 데이터에 보정된(retouched) 사진이 많아 모델이 "매끄러운 피부 = 고품질"로 학습하기 때문이다. 결과적으로 5~20픽셀 규모의 mid-frequency 디테일(모공, 미세 주름, 솜털, 색소 불균일)이 소거된다. 뇌는 이 "mid-frequency 공백"을 언캐니 밸리로 인식한다. (출처: cloudretouch.com, hailuoai.video)
- **손/손가락 오류**: 2025년 기준 최신 모델들이 크게 개선됐으나 완전히 해결되지 않음. Midjourney v7(2025년 4월 3일 출시)은 손·손가락 anatomy를 크게 개선했으나 복잡한 포즈에서 여전히 실패. DALL-E 3(현재 GPT-4o 이미지 생성으로 대체됨)은 ChatGPT의 자연어 이해와 결합해 손 정확도가 높은 편.
- **텍스트 깨짐**: 모델별 차이 명확함. Midjourney v7은 텍스트를 약 40% 확률로 오독·변형 생성. DALL-E 3은 5회 시도 중 5회 정자 렌더링 성공 (경쟁 모델 중 최강). Flux 1.x는 짧은 문구(2~4단어)는 정확하나 긴 문장에서 붕괴. Ideogram 2.0은 텍스트 정확도 82%로 업계 최고 수준.
- **조명 불일치·물리 오류**: Midjourney v7도 복잡한 다중 오브젝트 씬과 물리 시뮬레이션(반사, 굴절, 그림자 방향)에서 비현실적 결과를 냄.
- **아티팩트 누적(iterative editing)**: FLUX 1 Kontext Pro 등 인페인팅 반복 편집 시 10~15회 이상 누적하면 각 이터레이션마다 작은 아티팩트가 쌓여 이미지 품질 저하.

### 주요 모델 현황 (2025~2026)

- **Midjourney v7**: 2025년 4월 3일 출시, 2025년 6월 17일 기본 버전으로 전환. "완전히 새로운 아키텍처(totally different architecture)"라고 CEO David Holz 발표. Draft Mode(표준 대비 약 10배 빠른 초안 생성), Omni-Reference(--oref), Style Reference(--sref) 탑재. 개인화(personalization) 기본 활성화. 광환경 씬·세밀한 포컬 포인트에 강하나 와이드샷 미세 디테일과 텍스트에 여전히 약점.
- **FLUX 1.1 [pro]**: Black Forest Labs, 2024년 10월 1일 출시. 12B 파라미터, 멀티모달+병렬 diffusion transformer 하이브리드 아키텍처. 4.5초에 포토리얼리스틱 이미지 생성(전작 대비 6배 빠름). 최대 1440×1440px. 2024년 11월 Ultra 모드 추가(최대 4MP, 생성 10초). 손·해부학·조명에서 강점, 특히 피부 텍스처의 자연스러운 불완전함(정맥, 주름) 표현 우수.
- **GPT-4o 이미지 생성 (구 DALL-E 3 대체)**: OpenAI, 2025년 3월부터 ChatGPT 기본 이미지 생성 엔진으로 GPT-4o 네이티브 이미지 생성 도입. 자연어 지시 이해력과 텍스트 렌더링에서 최상급. 2025년 12월 16일 GPT Image 1.5 출시(4배 빠름). 2026년 4월 GPT Image 2 출시(추론 모델 도입, autoregressive 방식 채택 — diffusion 계열 아님, image-to-image 변환 지원).
- **Stable Diffusion 계열 (SDXL, SD 3.5)**: 오픈소스, LoRA/ControlNet 등 커스터마이징 생태계 최강. 네거티브 프롬프트 활용도가 다른 모델보다 높음.

### 아티팩트 기술 분류 (2025 CHI 학회 논문 기반)

- arxiv 2502.11989 "Characterizing Photorealism and Artifacts in Diffusion Model-Generated Images" (2025년 2월): diffusion model 생성 이미지의 아티팩트를 체계적으로 분류. 주요 범주: 해부학적 비현실성(anatomical implausibilities), 양식적 아티팩트(stylistic artifacts). 씬 복잡도, 아티팩트 유형, 이미지 노출 시간, 인간 큐레이션 여부 모두 AI/실제 판별 정확도에 영향.

### 후처리 기법

- **Photoshop/Lightroom 워크플로우**: Lightroom AI Denoise는 원클릭으로 노이즈 제거 후 DNG 파일 출력, 피부 텍스처·패브릭 디테일 보존. 작업 순서 원칙: 노이즈 제거 → 샤프닝 (역순 시 아티팩트 증폭). Photoshop clone stamp·healing brush는 소규모 결함에 효과적. Lightroom의 Generative Remove, Lens Blur는 2026년 기준 통합 편집 워크플로우로 발전.
- **인페인팅(inpainting)**: 손은 "Only masked" 512×512로 부분 재생성 권장(전체 이미지 인페인팅 대비 디테일 우수). 원본 생성 모델과 동일 모델의 인페인팅 변형 사용 시 스타일 일관성 최대. 한 번에 하나씩 수정(손 → 얼굴 → 배경 순서) — 한 패스에 여러 요소 수정 시 아티팩트 복합 발생.
- **필름 그레인 추가**: AI 이미지의 지나친 완벽함을 희석하는 역방향 기법. 프롬프트에 "subtle film grain, slight paper texture, matte finish, no plastic-smooth surfaces, editorial photography style" 추가 시 텍스처 편향 가능. 실제 필름 그레인이 있는 레퍼런스 이미지 첨부 시 효과 배가. 포스트에서 추가 시 강도 10~100% 조절 가능 (과도한 적용은 세부 텍스처 최대 15% 손실 위험).

### 네거티브 프롬프트 전략

- 모델별 권장 분량: SD 1.5 = 15~30개 용어, SDXL = 5~15개, SD 3.5 = 10개 미만.
- CFG scale 최적 범위: 7~12. CFG 12 이상 + 긴 네거티브 프롬프트 = 과포화·역효과. CFG 12 이상 시 네거티브 프롬프트는 3~5개 용어로 제한.
- 검증된 스타터 네거티브 프롬프트: `worst quality, low quality, blurry, jpeg artifacts, watermark, signature, text, bad anatomy, bad hands, extra limbs, deformed, ugly`
- 전략적 네거티브 적용 시 이미지 충실도 최대 25% 향상 보고.
- Midjourney·Flux·GPT Image 계열은 네거티브 프롬프트를 지원하지 않거나 제한적 지원 — 대신 포지티브 프롬프트 내에서 "avoid X" 형식 서술로 대응.

### 2025~2026 최신 동향

- **C2PA / 콘텐츠 자격증명(Content Credentials)**: 2025년 ISO/IEC 22144로 정식 표준화(C2PA 2.1). OpenAI, 2026년 5월 19일 C2PA 준수 + SynthID 워터마킹 + 공개 검증 레이어드 접근법 발표. Google Pixel 10, C2PA 적합성 프로그램 최고 등급 취득(스마트폰 최초).
- **EU AI Act**: 2026년 8월 2일부터 특정 AI 생성·조작 콘텐츠의 표시·공개 의무화.
- **SARGD 기법**: Adaptive Reality-Guided Diffusion — latent space에서 아티팩트를 탐지, 아티팩트 감지기로 비신뢰 픽셀 식별 후 Reality Guided Optimization으로 마스크와 현실적 latent 표현을 통합해 전파를 방지하는 연구 단계 기법.
- **img2img 진화**: 2026년 기준 img2img는 단순 리스타일이 아닌 완전한 편집 워크플로우로 발전. Flux 1.1의 Redux는 원본 이미지+새 프롬프트를 받아 구도·조명·색상은 유지하면서 지정 디테일만 재확산.

## 비교·맥락 정보

| 항목 | Midjourney v7 | Flux 1.1 Pro | GPT-4o Image / GPT Image 2 | SD(SDXL/3.5) |
|---|---|---|---|---|
| 출시 | 2025.04.03 | 2024.10.01 | 2025.03 (4o) / 2026.04 (Image 2) | 오픈소스 지속 업데이트 |
| 텍스트 렌더링 | 약함 (40% 오류) | 중간 (단문 강) | 최강 | 약함 (ControlNet 필요) |
| 손·해부학 | 크게 개선, 완전 해결 미달 | 강함 (피부 불완전함 자연 표현) | 강함 | 네거티브 프롬프트 의존 |
| 커스터마이징 | 제한적 | API 중심 | 제한적 | 최강 (LoRA/ControlNet) |
| 네거티브 프롬프트 | 미지원 | 제한적 | 미지원 | 완전 지원 |
| 아티팩트 누적 위험 | 낮음(단일 생성) | 반복 편집 시 높음 | 낮음 | 중간 |

**모델 공통 취약점**: 복잡한 다중 오브젝트 씬 공간 관계, 반사·굴절 등 고급 물리 현상, 배경 원경의 미세 디테일.

**"AI 티"의 역설**: AI 이미지가 지나치게 완벽할수록 더 AI처럼 보인다. 현실 사진의 불완전함(미세 그레인, 색수차, 렌즈 왜곡, 피사계 심도 주변부 흐림)이 오히려 "실사"의 신호다.

## Thesis 후보

1. **기술 원인 중심**: AI 이미지가 "티"가 나는 건 실력 문제가 아니라 diffusion model의 구조적 설계 때문이다 — 각 결함의 기술 원인을 이해하면 해결책도 달라진다.
2. **역방향 전략 중심**: AI 이미지를 실사처럼 보이게 하려면 "더 잘 만드는 것"이 아니라 "의도적으로 불완전하게 만드는 것"이 핵심이다 — 그레인, 렌즈 왜곡, 텍스처 노이즈를 더하는 역발상 워크플로우.
3. **모델 선택 가이드 중심**: 용도에 따라 모델과 후처리 전략이 달라야 한다 — Midjourney·Flux·GPT Image·SD 각각의 약점과 그에 맞는 보완책 매핑.

## 독자에게 줄 핵심 메시지

AI 이미지의 "티"는 프롬프트를 못 써서가 아니라 diffusion model이 "현실보다 더 현실 같은" 이상을 학습했기 때문이다. 이 글을 읽은 독자는 자신의 이미지에서 발견되는 특정 결함이 어떤 기술적 원인에서 비롯됐는지 진단하고, 프롬프트 수정 → 모델 설정 조정 → 후처리 그레인/인페인팅 추가의 3단계 대응 전략을 즉시 실행할 수 있어야 한다.

## 출처

- https://arxiv.org/abs/2502.11989 - "Characterizing Photorealism and Artifacts in Diffusion Model-Generated Images" (CHI 2025 논문, artifact 분류 체계)
- https://www.cloudretouch.com/de-plasticize-ai-skin-texture-photoshop/ - "Beyond the Uncanny Valley: How to De-Plasticize AI Skin Texture" (over-smoothing 기술 원인)
- https://hailuoai.video/pages/knowledge/subsurface-scattering-ai-skin-realism-master-guide - 피부 subsurface scattering과 AI 언캐니 밸리
- https://techcrunch.com/2025/04/03/midjourney-releases-its-first-new-ai-image-model-in-nearly-a-year/ - Midjourney v7 출시 (TechCrunch, 2025.04.03)
- https://venturebeat.com/ai/black-forest-labs-releases-flux-1-1-pro-and-an-api - FLUX 1.1 Pro 출시 (VentureBeat)
- https://bfl.ai/flux-1-1-ultra/ - FLUX 1.1 Pro Ultra/Raw 모드 공식 발표
- https://openai.com/index/introducing-4o-image-generation/ - OpenAI GPT-4o 이미지 생성 공식 발표 (2025.03)
- https://vertu.com/ai-tools/the-2025-reality-check-on-ai-generated-hands-and-fingers/ - 손/손가락 렌더링 2025 현황 비교
- https://zsky.ai/blog/why-ai-images-look-bad - "Why Your AI Images Look Bad: 15 Fixes [2026]"
- https://www.1bit.ai/blog/fix-ai-image-artifacts-troubleshooting-guide - AI 아티팩트 수정 단계별 가이드
- https://pxz.ai/blog/best-negative-prompts-for-realistic-ai-images - 리얼리스틱 AI 이미지용 네거티브 프롬프트 150+
- https://www.lovart.ai/blog/perfect-imperfection-add-grain-noise-natural-ai - 그레인·노이즈 추가로 AI 이미지 자연스럽게 만들기
- https://stable-diffusion-art.com/flux-img2img-inpainting/ - Flux img2img 및 인페인팅 가이드
- https://www.eyesift.com/ai-image-detection-2026-c2pa-content-credentials-synthid-watermarks-diffusion-fingerprints-deepfake/ - C2PA·SynthID·워터마킹 2026 동향
- https://goldpenguin.org/blog/midjourney-v7-review/ - Midjourney v7 리뷰 (Gold Penguin)
- https://pxlpeak.com/blog/ai-tools/midjourney-vs-dall-e-vs-flux-comparison - Midjourney vs DALL-E vs Flux 2026 비교
