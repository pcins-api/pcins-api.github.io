# PCINS Payment Gateway API Documentation 프로젝트 요약

## 1. 프로젝트 개요
PCINS 결제 게이트웨이(Hosted Payment Interface Service)의 API 연동 규격을 가맹점 및 파트너사에게 제공하기 위한 정적 API 문서 웹사이트입니다. OpenAPI 3.0 스펙을 기반으로 작성되어 있으며, Redoc 라이브러리를 통해 화면에 렌더링됩니다.

## 2. 주요 기술 스택
- **OpenAPI 3.0.3**: API 스펙 정의 (`openapi.yaml`)
- **Redoc**: OpenAPI 스펙을 웹 페이지 형식으로 렌더링 (`index.html`)
- **Node.js (npm)**: 로컬 프리뷰 및 빌드 도구 (Redocly CLI 활용)
- **GitHub Pages / Actions**: 문서 자동 배포 (CI/CD)

## 3. 핵심 API 기능 목록
본 API 문서는 크게 화면이 있는 **UI 결제**와 화면이 없는 **Non-UI(Server-to-Server) 결제** 방식으로 나뉩니다.

### UI 결제 (UI Payment)
- **신용카드 결제 및 크레딧 인증**: `/pay_link.jsp`
- **QR 간편결제(Alipay/Wechatpay 등)**: `/qr_link.jsp`
- **외부 3DS 결제 연동**: `/pay_external.jsp`
- **다이렉트 3D Secure 결제**: `/pay_direct3ds.jsp`

### Non-UI 결제 (API Payment)
- **일반 비인증 결제, 속결제, 환불, 거래 조회 등 종합 API**: `/pay_request.jsp`
- **3DS 결제 상태 수신용 Webhook (Idempotency 등 보안 고려)**: `/pay_3ds_status_check.jsp`

## 4. 로컬 구동 및 문서 업데이트 가이드
문서 내용을 수정하거나 확인할 때는 아래 명령어를 통해 구동합니다.

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행 및 프리뷰 확인
npm run dev

# 3. 작성된 OpenAPI 스펙의 에러 검증(Lint)
npm run lint

# 4. 배포용 정적 파일 빌드
npm run build
```

## 5. 핵심 파일 구조
- `openapi.yaml`: 가장 핵심이 되는 API 명세서 파일. 모든 Endpoint와 Schema가 이곳에 정의되어 있습니다.
- `index.html`: `openapi.yaml`을 불러와 사용자에게 보여주는 UI 진입점입니다.
- `AGENTS.md`: 컨벤션 가이드, 네이밍 규칙 및 에러 핸들링 규칙이 명시된 작업자 가이드 문서입니다.
- `package.json`: 로컬 스크립트 실행 및 Redocly 도구를 관리합니다.
