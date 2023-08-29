import { WebPlugin } from '@capacitor/core';
import type { IamportCapacitorPlugin } from './definitions';
export declare class IamportCapacitorWeb extends WebPlugin implements IamportCapacitorPlugin {
    startIamportActivity(options: any): Promise<any>;
}
