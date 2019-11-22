import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CertificationPageRoutingModule } from './certification-routing.module';

import { CertificationPage } from './certification.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CertificationPageRoutingModule,
    SharedModule,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [CertificationPage]
})
export class CertificationPageModule {}
