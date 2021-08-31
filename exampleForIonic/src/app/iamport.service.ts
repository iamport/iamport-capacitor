import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import queryString from 'query-string';

import { NgZone } from '@angular/core';
import {
  PaymentData,
  IamportCapacitor,
  CertificationOptions,
  CertificationData,
} from 'iamport-capacitor';
declare var IMP;

/**
 * 기존에 plugin.ts 에 있던 내용을 서비스로 빼서 작성
 * payment만 구현
 */
@Injectable({
  providedIn: 'root',
})
export class IamportService {
  private isCallbackCalled: boolean = false;

  //web redirect url
  private REDIRECT_URL_WEB = `http://localhost:8100/redirect_url?platform=web&`;

  //android, ios redirect url
  private REDIRECT_URL_APP = 'http://localhost/iamport';

  type: string;
  private triggerCallback: string = `function(response) {
    const query = [];
    Object.keys(response).forEach(key => {
      query.push(key + '=' + response[key]);
    });
    location.href = 'http://localhost/iamport?' + query.join('&');
  }`;

  constructor(private ngZone: NgZone) {
    this.initService();
  }

  initService() {
    if (Capacitor.getPlatform() == 'web') {
      this.loadScript();
    }
  }

  //web 일 경우에만 스크립트 로드
  public loadScript() {
    const body = <HTMLDivElement>document.head;
    const jquery_script = document.createElement('script');
    jquery_script.innerHTML = '';
    jquery_script.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    jquery_script.async = true;
    jquery_script.defer = true;
    body.appendChild(jquery_script);

    const iamportscript = document.createElement('script');
    iamportscript.innerHTML = '';
    iamportscript.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.8.js';
    iamportscript.async = true;
    body.appendChild(iamportscript);
  }

  getPaymentType(data: PaymentData): string {
    const { pg, pay_method } = data;
    if (pay_method === 'trans') {
      if (pg.includes('html5_inicis')) {
        return 'inicis';
      }
      if (pg.includes('nice')) {
        return 'nice';
      }
    }
    return 'payment';
  }

  /**
   * web 일 경우에만 javascript 이용한 호출로 분기
   * @param userCode
   * @param param
   * @returns
   */
  payment(userCode: string, param: PaymentData): Promise<any> {
    this.isCallbackCalled = false;
    if (Capacitor.getPlatform() == 'web') {
      return this.paymentWeb(userCode, param);
    } else {
      return this.paymentApp(userCode, param);
    }
  }

  paymentWeb(userCode: string, param: PaymentData) {
    return new Promise((resolve, reject) => {
      IMP.init(userCode);
      param['m_redirect_url'] = this.REDIRECT_URL_WEB;
      IMP.request_pay(param, async rsp => {
        if (
          rsp.success == true ||
          rsp.success == 'true' ||
          rsp.imp_success == true
        ) {
          resolve({
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
          });
        } else {
          reject(rsp);
        }
      });
    });
  }

  paymentApp(userCode: string, param: PaymentData) {
    return new Promise((resolve, reject) => {
      this.type = this.getPaymentType(param);
      const newOptions = {
        type: this.type,
        userCode,
        data: {
          ...param,
          m_redirect_url: this.REDIRECT_URL_APP,
        },
        triggerCallback: this.triggerCallback,
        redirectUrl: this.REDIRECT_URL_APP,
      };

      IamportCapacitor.addListener('IMPOver', async (data: any) => {
        if (!this.isCallbackCalled) {
          this.isCallbackCalled = true;
          IamportCapacitor.removeAllListeners();
          // 콜백 중복 호출 방지
          const platform = Capacitor.getPlatform();
          let query: any = null;
          if (platform === 'ios' && this.type === 'inicis') {
            /**
             * IOS && 이니시스 && 실시간 계좌이체 예외처리
             * 리디렉션 URL: io.ionic.starter://?imp_uid=imp_048747651691%26merchant_uid=mid_1573712730635%26m_redirect_url=http%3A%2F%2Flocalhost%2Fiamport%3Fimp_uid%3Dimp_048747651691%26merchant_uid%3Dmid_15737127306352
             */
            const decodedUrl = decodeURIComponent(data.url);
            const extractedQuery = queryString.extract(decodedUrl);
            const parsedQuery = queryString.parse(extractedQuery);
            const { imp_uid, merchant_uid } = parsedQuery;
            query = {
              imp_uid,
              merchant_uid:
                typeof merchant_uid === 'object'
                  ? merchant_uid[0]
                  : merchant_uid,
            };
          } else {
            const temp = queryString.parseUrl(data.url);
            query = temp.query;
          }
          this.ngZone.run(() => {
            if (
              query.success == true ||
              query.success == 'true' ||
              query.imp_success == 'true'
            ) {
              resolve(query);
            } else {
              reject(query);
            }
          });
        }
      });

      IamportCapacitor.addListener('IMPBack', async (data: any) => {
        if (!this.isCallbackCalled) {
          this.isCallbackCalled = true;
          IamportCapacitor.removeAllListeners();
          this.ngZone.run(() => {
            reject({ error_code: '1', error_msg: 'back' });
          });
        }
      });
      IamportCapacitor.startIamportActivity(newOptions);
    });
  }

  certification(userCode: string, data: CertificationData): Promise<any> {
    this.isCallbackCalled = false;
    if (Capacitor.getPlatform() == 'web') {
      return this.certificationWeb(userCode, data);
    } else {
      return this.certificationApp(userCode, data);
    }
  }

  certificationWeb(userCode: string, data: CertificationData): Promise<any> {
    // const { data, callback, callbackOnBack } = options;
    const newOptions = {
      type: 'certification',
      userCode,
      data,
      triggerCallback: this.triggerCallback,
      redirectUrl: this.REDIRECT_URL_WEB,
    };
    // this.addListener(callback, callbackOnBack);
    return IamportCapacitor.startIamportActivity(newOptions);
  }

  certificationApp(userCode: string, data: CertificationData): Promise<any> {
    // const { data, callback, callbackOnBack } = options;
    const newOptions = {
      type: 'certification',
      userCode,
      data,
      triggerCallback: this.triggerCallback,
      redirectUrl: this.REDIRECT_URL_APP,
    };
    // this.addListener(callback, callbackOnBack);

    //add callback listenr
    return IamportCapacitor.startIamportActivity(newOptions);
  }
}
