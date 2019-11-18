import { Pg, PayMethod, Carrier } from 'iamport-capacitor';

interface eachPg {
  value: Pg,
  label: string,
  text: string,
};

export interface eachMethod {
  value: PayMethod,
  label: string,
};

export interface eachQuota {
  value: number,
  label: string,
};

interface eachCarrier {
  value: Carrier,
  label: string,
};

export const PGS: Array<eachPg> = [
  {
    value: 'html5_inicis',
    label: '웹 표준 이니시스',
    text: '웹 표준 이니시스',
  },
  {
    value: 'kcp',
    label: 'NHN KCP',
    text: 'NHN KCP',
  },
  {
    value: 'kcp_billing',
    label: 'NHN KCP 정기결제',
    text: 'NHN KCP 정기결제',
  },
  {
    value: 'uplus',
    label: 'LG 유플러스',
    text: 'LG 유플러스',
  },
  {
    value: 'jtnet',
    label: 'JTNET',
    text: 'JTNET',
  },
  {
    value: 'nice',
    label: '나이스 정보통신',
    text: '나이스 정보통신',
  },
  {
    value: 'kakaopay',
    label: '신 - 카카오페이',
    text: '신 - 카카오페이',
  },
  {
    value: 'kakao',
    label: '구 - LG CNS 카카오페이',
    text: '구 - LG CNS 카카오페이',
  },
  {
    value: 'danal',
    label: '다날 휴대폰 소액결제',
    text: '다날 휴대폰 소액결제',
  },
  {
    value: 'danal_tpay',
    label: '다날 일반결제',
    text: '다날 일반결제',
  },
  {
    value: 'kicc',
    label: '한국정보통신',
    text: '한국정보통신',
  },
  {
    value: 'paypal',
    label: '페이팔',
    text: '페이팔',
  },
  {
    value: 'mobilians',
    label: '모빌리언스',
    text: '모빌리언스',
  },
  {
    value: 'payco',
    label: '페이코',
    text: '페이코',
  },
  {
    value: 'settle',
    label: '세틀뱅크 가상계좌',
    text: '세틀뱅크 가상계좌',
  },
  {
    value: 'naverco',
    label: '네이버 체크아웃',
    text: '네이버 체크아웃',
  },
  {
    value: 'naverpay',
    label: '네이버페이',
    text: '네이버페이',
  },
  {
    value: 'smilepay',
    label: '스마일페이',
    text: '스마일페이',
  },
];

export const METHODS: Array<eachMethod> = [
  {
    value: 'card',
    label: '신용카드',
  },
  {
    value: 'vbank',
    label: '가상계좌',
  },
  {
    value: 'trans',
    label: '실시간 계좌이체',
  },
  {
    value: 'phone',
    label: '휴대폰 소액결제'
  },
];

export const METHODS_FOR_INICIS: Array<eachMethod> =
  METHODS.concat([
    {
      value: 'samsung',
      label: '삼성페이',
    },
    {
      value: 'kpay',
      label: 'KPAY',
    },
    {
      value: 'cultureland',
      label: '문화상품권',
    },
    {
      value: 'smartculture',
      label: '스마트문상',
    },
    {
      value: 'happymoney',
      label: '해피머니',
    },
  ]);

export const METHODS_FOR_UPLUS: Array<eachMethod> =
  METHODS.concat([
    {
      value: 'cultureland',
      label: '문화상품권',
    },
    {
      value: 'smartculture',
      label: '스마트문상',
    },
    {
      value: 'booknlife',
      label: '도서상품권',
    },
  ]);

export const METHODS_FOR_KCP: Array<eachMethod> =
  METHODS.concat([
    {
      value: 'samsung',
      label: '삼성페이',
    },
  ]);

export const METHODS_FOR_MOBILIANS: Array<eachMethod> = [
  {
    value: 'card',
    label: '신용카드',
  },
  {
    value: 'phone',
    label: '휴대폰 소액결제',
  },
];

export const METHOD_FOR_CARD: Array<eachMethod> = [
  {
    value: 'card',
    label: '신용카드',
  },
];

export const METHOD_FOR_PHONE: Array<eachMethod> = [
  {
    value: 'phone',
    label: '휴대폰 소액결제',
  },
];

export const METHOD_FOR_VBANK: Array<eachMethod> = [
  {
    value: 'vbank',
    label: '가상계좌',
  },
];

export const QUOTAS: Array<eachQuota> = [
  {
    value: 0,
    label: 'PG사 기본 제공',
  },
  {
    value: 1,
    label: '일시불',
  },
];
  
export const CARRIERS: Array<eachCarrier> = [
  {
    value: 'SKT',
    label: 'SKT',
  },
  {
    value: 'KTF',
    label: 'KT',
  },
  {
    value: 'LGT',
    label: 'LGU+',
  },
  {
    value: 'MVNO',
    label: '알뜰폰',
  },
];
  