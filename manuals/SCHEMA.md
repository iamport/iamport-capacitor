# 스키마

### PaymentOption

| Key      | Type        |  Description    | Required |
| -------- | ----------- | --------------- | -------- |
| userCode | string      | 가맹점 식별코드     | true     |
| data     | PaymentData | 결제에 필요한 정보   | true     |
| callback | function    | 결제 후 실행 될 함수 | true     |

### PaymentData

| Key            | Type       |  Description              | Required |
| -------------- | ---------- | ------------------------- | -------- |
| pg             | Pg         | PG사                       | false    |
| pay_method     | PayMethod  | 결제수단                     | false    |
| merchant_uid   | string     | 주문번호                     | false    |
| name           | string     | 주문명                      | false    |
| amount         | string     | 결제금액                     | true     |
| app_scheme     | string     | 앱 URL Scheme              | true     |
| buyer_name     | string     | 구매자 이름                  | false    |
| buyer_tel      | string     | 구매자 연락처                 | false    |
| buyer_email    | string     | 구매자 이메일                 | false    |
| buyer_addr     | string     | 구매자 주소                   | false    |
| buyer_postcode | string     | 구매자 우편번호                | false    |
| tax_free       | string     | 면세공급가액                  | false    |
| custom_data    | object     | 가맹점 임의 데이터             | false    |
| customer_uid   | string     | 정기결제시 카드 고유번호         | false    |
| digital        | boolean    | 휴대폰 소액결제시 실물 컨텐츠 여부 | false    |
| escrow         | boolean    | 에스크로 여부                 | false    |
| biz_num        | string     | 사업자번호                    | false    |
| language       | string     | 언어설정 값                   | false    |
| notice_url     | string     | 결제 건 고유 웹훅 URL          | false    |
| currency       | string     | 통화                        | false    |
| vbank_due      | string     | 가상계좌 입금기한              | false    |
| display        | object     | 결제창 옵션                  | false    | 

#### Pg

| Value        | Description         |
| ------------ | ------------------- |
| html5_inicis | 웹 표준 이니시스        |
| kcp          | NHN KCP             |
| kcp_billing  | NHN KCP 정기결제      |
| uplus        | LG 유플러스           |
| jtnet        | JTNET               |
| nice         | 나이스 정보통신         |
| kakaopay     | 신 - 카카오페이        |
| kakao        | 구 - LG CNS 카카오페이 |
| danal        | 다날 휴대폰 소액결제     |
| danal_tpay   | 다날 일반결제          |
| kicc         | 한국정보통신           |
| paypal       | 페이팔               |
| mobilians    | 모빌리언스            |
| payco        | 페이코               |
| settle       | 세틀뱅크              |
| naverco      | 네이버 체크아웃         |
| naverpay     | 네이버페이             |
| smilepay     | 스마일페이             |

#### PayMethod

| Value        | Description |
| ------------ | ----------- |
| card         | 신용카드      |
| trans        | 계좌이체      |
| vbank        | 가상계좌      |
| phone        | 휴대폰 소액결제 |
| samsung      | 삼성페이       |
| payco        | 페이코        |
| kpay         | KPAY        |
| cultureland  | 문화상품권     |
| smartculture | 스마트문상     |
| happymoney   | 해피머니       |
| booknlife    | 도서상품권      |

### CertificationOption

| Key      | Type              |  Description       | Required |
| -------- | ----------------- | ------------------ | -------- |
| userCode | string            | 가맹점 식별코드        | true     |
| data     | CertificationData | 본인인증에 필요한 정보   | true     |
| callback | function          | 본인인증 후 실행 될 함수 | true     |

### CertificationData

| Key          | Type    |  Description       | Required |
| ------------ | ------- | ------------------ | -------- |
| merchant_uid | string  | 가맹점 주문번호        | false    |
| company      | string  | 회사명 또는 URL       | false    |
| carrier      | Carrier | 통신사               | false    |
| name         | string  | 본인인증 할 이름       | false    |
| phone        | string  | 본인인증 할 전화번호    | false    |
| min_age      | string  | 본인인증 허용 최소 연령  | false    |

#### Carrier
| Value | Description |
| ----- | ----------- |
| SKT   | SKT         |
| KTF   | KT          | 
| LGT   | LGU+        |
| MVNO  | 알뜰폰        |
