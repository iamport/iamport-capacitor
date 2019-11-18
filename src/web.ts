import { WebPlugin } from '@capacitor/core';
import { IamportCapacitorPlugin, PaymentOptions, CertificationOptions } from './definitions';

export class IamportCapacitorWeb extends WebPlugin implements IamportCapacitorPlugin {
  constructor() {
    super({
      name: 'IamportCapacitor',
      platforms: ['web']
    });
  }

  async payment(options: PaymentOptions): Promise<PaymentOptions> {
    return options;
  }

  async certification(options: CertificationOptions): Promise<CertificationOptions> {
    return options;
  }
}

const IamportCapacitor = new IamportCapacitorWeb();

export { IamportCapacitor };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(IamportCapacitor);
