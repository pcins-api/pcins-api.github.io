# Apidog 기존 API 문서 vs 현재 `openapi.yaml` 비교 분석 리포트

Apidog에 작성된 기존 API 명세서 내용과 현재 로컬에 저장된 `openapi.yaml` 간의 주요 차이점 및 반영이 필요한 사항들을 정리했습니다. 작업을 진행할 때 아래 항목들을 우선적으로 수정해야 합니다.

## 1. 버전 업데이트 내역 (Change History) 누락 및 불일치
Apidog의 변경 이력(Change History v1.0.0 ~ v1.0.5)과 비교했을 때, OpenAPI 스펙에 일부 세부 반영이 누락된 항목들이 존재합니다.

- **v1.0.1 ~ v1.0.2 (`/pay_external.jsp`):** `callbackURL`, `returnURL` 필드는 추가되어 있으나 필드에 대한 Description 등에 버전 히스토리 배경 설명 보완 권장.
- **v1.0.4 (`/pay_direct3ds.jsp`):** 3DS 인증을 거치지 않고 결제가 완료된 경우의 응답 예시가 선언되어 있지 않습니다. (Apidog에는 소문자 태그인 `<tranactionresponse>`, `<transstate>` 등을 포함한 응답 예시가 추가됨)
- **v1.0.5 (`/pay_request.jsp`):** Credit Card Payment (Non-UI)에 `callbackURL`과 `returnURL`이 조건부(C) 또는 선택(O) 필드로 기술되어 있으나 `openapi.yaml`의 스키마(`DirectPaymentRequest`)에서는 이 필드들이 다른 결제 방식(Speed Payment 등)과 혼재되어 명확하게 분리되어 있지 않습니다.

## 2. 엔드포인트 별 Request 스키마 불일치
Apidog에서는 각 결제 방식 별로 Mandatory(M), Optional(O), Conditional(C) 여부가 명확히 나뉘어 있으나, `openapi.yaml`은 일부 재사용 스키마(`DirectPaymentRequest` 등)를 통해 묶여 있어 제약 조건이 정확히 맞지 않습니다.

### 2.1. Credit Card Payment (UI) - `/pay_link.jsp`
- **필드 추가 필요/조건부 반영:** 
  - `merchantPwd` (3DS 인증 시 M)
  - `cardType` (3DS 인증 시 C)
  - `transNo`, `errCode` 필드가 문서 상 조건부/선택으로 존재함.
- **필수(M) / 선택(O) 불일치:** `payName`이 Apidog에서는 조건부(C)이나, `openapi.yaml`에서는 필수/선택 여부가 엇갈림. `payId`는 선택(O).

### 2.2. QR Payment (UI) - `/qr_link.jsp`
- 현재 `openapi.yaml`에는 `QRPaymentUIRequest` 스키마가 비어있거나 구체적으로 명시되어 있지 않은 것으로 보입니다.
- **필수 반영 요소:** Apidog 기준 `merchantPwd`(C), `payName`(M), `payId`(M), `payEmail`(M), `payTel`(M), `referURL`(M), `returnURL`(M), `lang`(O) 필드들을 포함해 스키마 세분화 필요.

### 2.3. Non-UI 결제 범용 - `/pay_request.jsp`
- **Credit Card vs Speed Payment vs Refund vs Inquiry:** `tradeGubun` 파라미터(1, 2, 9 등)에 따라 필수 파라미터가 크게 상이합니다.
  - 현재는 `DirectPaymentRequest` 하나의 스키마로 모두 묶여 있어 `oneOf` 제약이나 구체화된 스키마로 분리(Refactoring)하는 것이 권장됩니다.
  - **예시:** Speed Payment일 경우 `payEmail`, `payTel`, `productName`이 Optional이나, 일반 신용카드 Non-UI 결제일 경우 Mandatory입니다.

## 3. Response 스키마 (XML) 오류 및 세분화 부족
현재 `openapi.yaml`은 대부분의 응답을 `TransactionResponse` 스키마 하나로 처리하고 있습니다. 그러나 Apidog의 응답 포맷은 상황에 따라 태그가 상이합니다.

- **에러 응답 구분:** 에러 시 Apidog은 `<ErrorResponse>` 루트 태그를 사용하며 내부에 `responseType`, `ref`, `transNo`, `resultCode`, `resultMsg`, `approvalNo` 태그를 반환합니다. 현재 OpenAPI에는 이를 반영한 스키마 정의가 필요합니다.
- **트랜잭션 조회 응답 (`tradeGubun=9`):** 응답에 `<transStatus>`(1=Sale, 2=Refund) 엘리먼트가 존재해야 합니다. 현재 스키마에는 이 노드가 누락되어 있습니다.
- **Direct 3DS 무인증 응답:** `<tranactionresponse>` 안의 태그들이 모두 소문자로 표기되는 형태(`<responsetype>`, `<transstate>`, `<externalurl>` 등)의 예외 케이스 스키마 추가가 필요합니다.

## 4. ResultCode (결과 코드) 업데이트
Apidog 기준 다음의 신규/상세 ResultCode가 추가/수정되었습니다. 이를 `openapi.yaml`의 마크다운 표 영역 및 Description에 추가해야 합니다.
- **200:** Request Connection
- **101:** Failed to enter continuous billing information.
- **611, 612:** 한도/횟수 초과 에러
- **900, 901, 935, 936, 941** 등 추가 에러 반환 케이스

## 5. 결론 및 수정 제안 (Action Plan)
1. **스키마 분리:** `/pay_request.jsp` 등 기능이 겹치는 라우트의 Request Body 스키마를 `oneOf`를 활용하거나 `tradeGubun` 값에 따라 각 결제별 요구사항(Mandatory/Optional)을 정확히 분리.
2. **XML 응답 스키마 분리:** 성공용 `<TransactionResponse>`, 3DS 없는 성공용 `<tranactionresponse>`, 실패용 `<ErrorResponse>` 등 상황별 XML 스키마를 별도 정의 후 각 API의 200, 400, 500 응답에 맞게 매핑.
3. **요청 누락 필드 추가:** `cardType`, `referURL`, `callbackURL`, `returnURL` 등 조건부로 누락된 파라미터 보강 및 Apidog 설명 반영.
4. **결과 코드 표 내용 현행화:** Description 최상단에 있는 `Result Codes` 표를 마크다운 최신 버전 기준으로 덮어쓰기.
