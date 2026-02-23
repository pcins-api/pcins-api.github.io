# OpenAPI 문서 재정렬 계획 (DOCUMENT SORT PLAN)

현재 `openapi.yaml`에 작성된 엔드포인트(Paths)와 데이터 모델(Schemas)이 섞여 있어, 개발자 관점에서 직관적으로 읽고 이해하기 어렵습니다. 

따라서 다음과 같이 **1) UI 결제**, **2) 서버 간 결제 및 조회(Non-UI)**, **3) 비동기 처리(Webhook)** 의 흐름으로 논리적이고 가독성이 높은 순서대로 재배치할 계획입니다.

## 1. 엔드포인트(Paths) 정렬 순서 플랜

가장 많이 사용되는 화면(UI) 연동 방식을 먼저 배치하고, 백엔드 API, 마지막으로 결과를 수신하는 웹훅 순서로 정렬합니다.

1. **[UI Payment Group] 사용자 화면 연동**
   - `/pay_link.jsp`: 신용카드 결제 및 크레딧 인증 (UI)
   - `/pay_external.jsp`: 외부 UI 결제 (UI, 3DS 지원) 
   - `/pay_direct3ds.jsp`: 다이렉트 3D Secure 결제 (UI, 3DS 지원)
   - `/qr_link.jsp`: QR 간편결제 (UI)

2. **[Non-UI Payment & API Group] 서버 간 다이렉트 연동**
   - `/pay_request.jsp`: 신용카드 결제, 속결제, 환불, 거래 조회 (Non-UI 종합)

3. **[Webhook & Notification Group] 비동기 알림 수신**
   - `/pay_3ds_status_check.jsp`: 3DS 결제 결과 수신 웹훅 (Non-UI)

## 2. 컴포넌트 스키마(Schemas) 정렬 순서 플랜

엔드포인트 배치 순서와 동일한 맥락으로 스키마(요청/응답 모델)를 그룹화하여 찾기 쉽게 모아둡니다.

1. **UI Payment 요청 스키마**
   - `CreditCardUIRequest`
   - `CreditCertificationUIRequest`
   - `ExternalUIRequest`
   - `Direct3DSRequest`
   - `QRPaymentUIRequest`

2. **Non-UI Payment 요청 스키마**
   - `CreditCardNonUIRequest`
   - `SpeedPaymentNonUIRequest`
   - `RefundRequest`
   - `TransactionInquiryRequest`

3. **Webhook 수신 스키마**
   - `PaymentNotificationRequest`

4. **공통 응답(Response) 스키마 모음**
   - `TransactionResponse`
   - `TranactionResponse3DS`
   - `Direct3DSNoAuthResponse`
   - `JavascriptRedirectResponse`
   - `ErrorResponse`

## 3. 전역 `info.description` Index 정렬 (선택 사항)
본문(Paths) 정렬이 완료된 이후, `openapi.yaml` 최상단의 `## Index` 부분도 위 순서와 동일하게 번호를 매겨 최신화하여 목차와 본문의 싱크를 맞춥니다.
