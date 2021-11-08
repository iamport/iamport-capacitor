// import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
import queryString from 'query-string';

import type {
  PaymentData,
  PaymentOptions,
  CertificationOptions,
} from './definitions';
import {
  IamportCapacitor
} from './index'

// const REDIRECT_URL = 'http://localhost/iamport';
const REDIRECT_URL = 'http://detectchangingwebview/iamport/capacitor';


export class IMP {
  private isCallbackCalled = false;
  private triggerCallback = `function(response) {
      const query = [];
      Object.keys(response).forEach(key => {
        query.push(key + '=' + response[key]);
      });

      location.href = 'http://detectchangingwebview/iamport/capacitor?' + query.join('&');
    }`;         

  addListenerInner(callback: any, callbackOnBack: any, type?: string) {

    IamportCapacitor.addListener('IMPOver', async ({ url }: any) => {

      if (!this.isCallbackCalled) { // 콜백 중복 호출 방지
        // const { platform } = await Device.getInfo();
        const platform = Capacitor.getPlatform();
        if (platform === 'ios' && type === 'inicis') {
          /** 
           * IOS && 이니시스 && 실시간 계좌이체 예외처리
           * 리디렉션 URL: io.ionic.starter://?imp_uid=imp_048747651691%26merchant_uid=mid_1573712730635%26m_redirect_url=http%3A%2F%2Flocalhost%2Fiamport%3Fimp_uid%3Dimp_048747651691%26merchant_uid%3Dmid_15737127306352
          */
          const decodedUrl = decodeURIComponent(url);
          const extractedQuery = queryString.extract(decodedUrl);
          const parsedQuery = queryString.parse(extractedQuery);
          const { imp_uid, merchant_uid } = parsedQuery;
          const success = "true" 
          const query = {
            success,
            imp_uid,
            merchant_uid:
                typeof merchant_uid === 'object'
                  ? merchant_uid?.[0]
                  : merchant_uid,
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
    this.addListenerInner(callback, callbackOnBack, type);
    return IamportCapacitor.startIamportActivity(newOptions);
  }

  getPaymentType(data: PaymentData): string {
    const { pg, pay_method } = data;
    if (pay_method === 'trans') {
      if (pg!.includes('html5_inicis')) {
        return 'inicis';
      }
      if (pg!.includes('nice')) {
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
      data: {
        ...data,
        m_redirect_url: REDIRECT_URL,
      },
      triggerCallback: this.triggerCallback,
      redirectUrl: REDIRECT_URL,
    };
    this.addListenerInner(callback, callbackOnBack);

    return IamportCapacitor.startIamportActivity(newOptions);
  }
}