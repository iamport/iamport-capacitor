import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    SharedModule,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [PaymentPage]
})
export class PaymentPageModule {}
