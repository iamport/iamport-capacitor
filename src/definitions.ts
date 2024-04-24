import type { PluginListenerHandle } from '@capacitor/core';

export interface IamportCapacitorPlugin {
  startIamportActivity(options: any): Promise<any>;

  //native app only
  addListener(
    name: string,
    callback: any,
  ): Promise<PluginListenerHandle>;
  //native app only
  removeAllListeners(): Promise<void>;
}

export type Pg =
  | 'html5_inicis'
  | 'kcp'
  | 'kcp_billing'
  | 'uplus'
  | 'jtnet'
  | 'nice'
  | 'kakaopay'
  | 'kakao'
  | 'danal'
  | 'danal_tpay'
  | 'kicc'
  | 'paypal'
  | 'mobilians'
  | 'payco'
  | 'settle'
  | 'naverco'
  | 'naverpay'
  | 'smilepay';
export type PayMethod =
  | 'card'
  | 'trans'
  | 'vbank'
  | 'phone'
  | 'samsung'
  | 'kpay'
  | 'cultureland'
  | 'smartculture'
  | 'happymoney'
  | 'booknlife';

export interface PaymentData {
  pg?: Pg;
  pay_method?: PayMethod;
  merchant_uid?: string;
  name?: string;
  amount: string;
  app_scheme: string;
  buyer_name?: string;
  buyer_tel?: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  tax_free?: string;
  custom_data?: any;
  customer_uid?: string;
  digital?: boolean;
  escrow?: boolean;
  biz_num?: string;
  language?: string;
  notice_url?: string;
  currency?: string;
  vbank_due?: string;
  display?: {
    card_quota: number[];
  };
}

export interface PaymentOptions {
  userCode: string;
  data: PaymentData;
  callback: (response: Response) => void;
  callbackOnBack?: () => void;
}

export type Carrier = 'SKT' | 'KTF' | 'LGT' | 'MVNO';

export interface CertificationData {
  merchant_uid?: string;
  company?: string;
  carrier?: Carrier;
  name?: string;
  phone?: string;
  min_age?: string;
}

export interface CertificationOptions {
  userCode: string;
  data: CertificationData;
  callback: (response: Response) => void;
  callbackOnBack?: () => void;
}

export interface Response {
  imp_success?: string;
  success?: string;
  imp_uid: string;
  merchant_uid: string;
  error_code?: string;
  error_msg?: string;
}
