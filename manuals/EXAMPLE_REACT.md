# 아임포트 캐패시터 모듈 리액트 예제코드

아임포트 캐패시터 모듈을 리액트 프로젝트(+ 타입스크립트)에서 사용할때의 예제 코드입니다. 필요한 파라미터는 [스키마](./SCHEMA.md)를 참고하세요.

### 1. 일반/정기결제 예제
```javascript
import React from 'react';
/* 아임포트 모듈을 불러옵니다. */
import { IMP, PaymentData, PaymentOptions, Response, Pg, PayMethod } from 'iamport-capacitor';

const Payment: React.FC = () => {
  /* 결제 종료 후 필요한 로직을 작성합니다. */
  function callback(response: Response) {
    const { imp_uid, merchant_uid } = response;
    alert(`아임포트 번호: ${imp_uid}, 주문번호: ${merchant_uid}`);
  }

  function onClickPayment() {
    const imp = new IMP();

    /* 가맹점 식별코드를 입력합니다. */
    const userCode: string = 'iamport';
    const pg: Pg = 'html5_inicis';
    const payMethod: PayMethod = 'card';

    /* 결제에 필요한 데이터를 입력합니다. */
    const data: PaymentData = {
      pg,                                           // PG사
      pay_method: payMethod,                        // 결제수단
      name: '아임포트 결제데이터 분석',                   // 주문명
      merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호
      amount: '39000',                              // [필수입력] 결제금액
      buyer_name: '홍길동',                           // 구매자 이름
      buyer_tel: '01012345678',                     // 구매자 연락처
      buyer_email: 'example@naver.com',             // 구매자 이메일
      buyer_addr: '서울시 강남구 신사동 661-16',         // 구매자 주소
      buyer_postcode: '06018',                      // 구매자 우편번호
      app_scheme: 'example',                        // [필수입력] 앱 URL 스킴
    };

    const options: PaymentOptions = {
      userCode,
      data,
      callback,
    };
    imp.payment(options);
  }

  return <button onClick={onClickPayment}>결제하기</button>;
}

export default Payment;
```


### 2. 휴대폰 본인인증 예제
```javascript
import React from 'react';
/* 아임포트 모듈을 불러옵니다. */
import { IMP, CertificationData, CertificationOptions, Response, Carrier } from 'iamport-capacitor';

const Certification: React.FC = () => {
  /* 결제 종료 후 필요한 로직을 작성합니다. */
  function callback(response: Response) {
    const { imp_uid, merchant_uid } = response;
    alert(`아임포트 번호: ${imp_uid}, 주문번호: ${merchant_uid}`);
  }

  function onClickPayment() {
    const imp = new IMP();

    /* 가맹점 식별코드를 입력합니다. */
    const userCode: string = 'iamport';
    const carrier: Carrier = 'SKT';

    /* 본인인증에 필요한 데이터를 입력합니다. */
    const data: CertificationData = {
      merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호
      company: '아임포트',                            // 회사명
      carrier,                                      // 통신사
      name: '홍길동',                                 // 본인인증 할 이름
      phone: '01012341234',                         // 본인인증 할 전화번호
    };

    const options: CertificationOptions = {
      userCode,
      data,
      callback,
    };
    imp.certification(options);
  }

  return <button onClick={onClickCertification}>본인인증하기</button>;
}

export default Certification;
```