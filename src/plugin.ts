import { Plugins } from '@capacitor/core';
import queryString from 'query-string';
import {
  IamportCapacitorPlugin,
  PaymentOptions,
  PaymentData,
  CertificationOptions,
} from './definitions';

const { IamportCapacitor, Device } = Plugins;

const REDIRECT_URL = 'http://localhost/iamport';

export class IMP implements IamportCapacitorPlugin {
  private isCallbackCalled: boolean = false;       
  private triggerCallback: string = `function(response) {
      const query = [];
      Object.keys(response).forEach(key => {
        query.push(key + '=' + response[key]);
      });

      location.href = 'http://localhost/iamport?' + query.join('&');
    }`;         

  addListener(callback: any, callbackOnBack: any, type?: String) {
    IamportCapacitor.addListener('IMPOver', async ({ url }: any) => {

      if (!this.isCallbackCalled) { // 콜백 중복 호출 방지
        const { platform } = await Device.getInfo();
        if (platform === 'ios' && type === 'inicis') {
          /** 
           * IOS && 이니시스 && 실시간 계좌이체 예외처리
           * 리디렉션 URL: io.ionic.starter://?imp_uid=imp_048747651691%26merchant_uid=mid_1573712730635%26m_redirect_url=http%3A%2F%2Flocalhost%2Fiamport%3Fimp_uid%3Dimp_048747651691%26merchant_uid%3Dmid_15737127306352
          */
          const decodedUrl = decodeURIComponent(url);
          const extractedQuery = queryString.extract(decodedUrl);
          const parsedQuery = queryString.parse(extractedQuery);
          const { imp_uid, merchant_uid } = parsedQuery;
          const query = {
            imp_uid,
            merchant_uid: typeof merchant_uid === 'object' ? merchant_uid[0] : merchant_uid,
          };
          callback(query);
        } else {
          const { query } = queryString.parseUrl(url);
          callback(query);
        }
        this.isCallbackCalled = true;
      }
    });

    IamportCapacitor.addListener('IMPBack', async () => {
      if (callbackOnBack) {
        callbackOnBack();
      }
    });
  }

  payment(options: PaymentOptions): Promise<PaymentOptions> {
    const { userCode, data, callback, callbackOnBack } = options;
    const type = this.getPaymentType(data);
    const newOptions = {
      type,
      userCode,
      data: {
        ...data,
        m_redirect_url: REDIRECT_URL,
      },
      triggerCallback: this.triggerCallback,
      redirectUrl: REDIRECT_URL,
    };
    this.addListener(callback, callbackOnBack, type);
    return IamportCapacitor.startIamportActivity(newOptions);
  }

  getPaymentType(data: PaymentData): String {
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

  certification(options: CertificationOptions): Promise<CertificationOptions> {
    const { userCode, data, callback, callbackOnBack } = options;
    const newOptions = {
      type: 'certification',
      userCode,
      data,
      triggerCallback: this.triggerCallback,
      redirectUrl: REDIRECT_URL,
    };
    this.addListener(callback, callbackOnBack);

    return IamportCapacitor.startIamportActivity(newOptions);
  }
}