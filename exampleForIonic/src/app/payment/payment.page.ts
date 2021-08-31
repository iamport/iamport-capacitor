import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { PGS } from 'src/constants';
import Utils from 'src/utils';
import { Pg, PayMethod, PaymentData } from '../../../../dist/esm';
import { IamportService } from '../iamport.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  pg: Pg = 'html5_inicis';
  pgs = PGS;
  method: PayMethod = 'card';
  methods = Utils.getMethods(this.pg);
  quota: string = '0';

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private iamport: IamportService,
  ) {}

  ngOnInit(): void {
    this.initializeValidateForm();
  }

  initializeValidateForm(): void {
    this.pg = 'html5_inicis';
    this.pgs = PGS;
    this.method = 'card';
    this.methods = Utils.getMethods(this.pg);
    this.quota = '0';

    this.validateForm = this.fb.group({
      pg: [this.pg],
      method: [this.method],
      quota: [this.quota],
      escrow: [false],
      name: ['아임포트 결제데이터 분석', [Validators.required]],
      amount: ['1000', [Validators.required]],
      merchant_uid: [`mid_${new Date().getTime()}`, [Validators.required]],
      buyer_name: ['홍길동'],
      buyer_tel: ['01012341234'],
      buyer_email: ['example@example.com'],
      vbank_due: [null],
      biz_num: [null],
      digital: [false],
    });
  }

  onChangePg(pg: Pg) {
    this.pg = pg;

    const methods = Utils.getMethods(pg);
    this.method = methods[0].value;

    const quotas = Utils.getQuotas(pg);
    this.quota = quotas[0].value;
  }

  onChangeMethod(method: PayMethod) {
    this.method = method;
  }

  submitForm(): void {
    const { controls, status, value } = this.validateForm;
    for (const i in controls) {
      controls[i].markAsDirty();
      controls[i].updateValueAndValidity();
    }

    if (status === 'VALID') {
      // const imp = new IMP();
      const userCode: string = Utils.getUserCode(this.pg);
      const {
        merchant_uid,
        name,
        amount,
        buyer_name,
        buyer_tel,
        buyer_email,
        escrow,
        vbank_due,
        biz_num,
        digital,
      } = value;

      const data: PaymentData = {
        pg: this.pg,
        pay_method: this.method,
        merchant_uid,
        name,
        amount,
        buyer_name,
        buyer_tel,
        buyer_email,
        escrow,
        app_scheme: 'kr.iamport.example.angular',
      };

      // 신용카드의 경우, 할부기한 추가
      if (this.method === 'card' && this.quota !== '0') {
        data.display = {
          card_quota: this.quota === '1' ? [] : [parseInt(this.quota, 10)],
        };
      }
      // 가상계좌의 경우, 입금기한 추가
      if (this.method === 'vbank' && vbank_due.length !== 0) {
        data.vbank_due = vbank_due;
      }
      // 다날 && 가상계좌의 경우, 사업자 등록번호 10자리 추가
      if (this.method === 'vbank' && this.pg === 'danal_tpay') {
        data.biz_num = biz_num;
      }
      // 휴대폰 소액결제의 경우, 실물 컨텐츠 여부 추가
      if (this.method === 'phone') {
        data.digital = digital;
      }
      // 정기결제의 경우, customer_uid 추가
      if (this.pg === 'kcp_billing') {
        data.customer_uid = `cuid_${new Date().getTime()}`;
      }

      // const options = {
      //   userCode,
      //   data,
      //   callback: this.callback,
      // };

      this.iamport
        .payment(userCode, data)
        .then((result: any) => {
          console.log('result', result);
          alert('success:' + JSON.stringify(result));
        })
        .catch(error => {
          console.log('error', error);
          alert('error:' + JSON.stringify(error));
        });
      // imp.payment(options);
    }
  }

  callback = (response: Response) => {
    this.ngZone.run(() =>
      this.router.navigate(['/result', { ...response, type: 'payment' }]),
    );
  };
}
