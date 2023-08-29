import type { PaymentData, PaymentOptions, CertificationOptions } from './definitions';
export declare class IMP {
    private isCallbackCalled;
    private triggerCallback;
    addListenerInner(callback: any, callbackOnBack: any, type?: string): void;
    payment(options: PaymentOptions): Promise<PaymentOptions>;
    getPaymentType(data: PaymentData): string;
    certification(options: CertificationOptions): Promise<CertificationOptions>;
}
