import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificationPageRoutingModule } from './certification-routing.module';

import { CertificationPage } from './certification.page';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CertificationPageRoutingModule,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [CertificationPage],
})
export class CertificationPageModule {}
