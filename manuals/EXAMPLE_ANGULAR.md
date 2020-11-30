# 아임포트 캐패시터 모듈 앵귤러 예제코드

아임포트 캐패시터 모듈을 앵귤러 프로젝트(+ 타입스크립트)에서 사용할때의 예제 코드입니다. 필요한 파라미터는 [스키마](./SCHEMA.md)를 참고하세요.

### 1. 일반/정기결제 예제
```html
<!-- payment.page.html -->

<ion-content>
  <button (click)="onClickPayment()">결제하기</button>
</ion-content>
```

```javascript
// payment.page.ts

import { Router } from '@angular/router';
import { Component, NgZone } from '@angular/core';

import { IMP, PaymentData, Pg, PayMethod, Response } from 'iamport-capacitor';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
})
export class PaymentPage {

  constructor(private router: Router, private ngZone: NgZone) {}

  onClickPayment(): void {
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
      app_scheme: 'exampleForAngular',              // [필수입력] 앱 URL 스킴
    };

    const options: PaymentOptions = {
      userCode,
      data,
      callback: this.callback,
      callbackOnBack: this.callbackOnBack,
    };
    imp.payment(options);
  }

  callback = (response: Response) => {
    this.ngZone.run(() =>
      // 결과 페이지로 이동
      this.router.navigate(['/result', response])
    );
  }

  /* [안드로이드 전용 / 선택입력] 뒤로가기로 결제창 벗어났을때 로직을 작성합니다. */
  callbackOnBack = () => {
    alert('결제를 중단하셨습니다.');
  }
}
```


### 2. 휴대폰 본인인증 예제
```html
<!-- certification.page.html -->

<ion-content>
  <button (click)="onClickCertification()">본인인증 하기</button>
</ion-content>
```

```javascript
// certification.page.ts

import { Router } from '@angular/router';
import { Component, NgZone } from '@angular/core';

import { IMP, CertificationData, Response, Carrier } from 'iamport-capacitor';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.page.html',
})
export class CertificationPage implements OnInit {

  constructor(private router: Router, private ngZone: NgZone) {}

  onClickCertification(): void {
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
      
    const options = {
      userCode,
      data,
      callback: this.callback,
      callbackOnBack: this.callbackOnBack,
    };

    imp.certification(options);
  }

  callback = (response: Response) => {
    this.ngZone.run(() =>
      // 결과 페이지로 이동
      this.router.navigate(['/result', response])
    );
  }

  /* [안드로이드 전용 / 선택입력] 뒤로가기로 본인인증창 벗어났을때 로직을 작성합니다. */
  callbackOnBack = () => {
    alert('본인인증을 중단하셨습니다.');
  }
}
```