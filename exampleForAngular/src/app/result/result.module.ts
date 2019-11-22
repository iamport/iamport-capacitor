import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ResultPageRoutingModule } from './result-routing.module';

import { ResultPage } from './result.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultPageRoutingModule,
    SharedModule,
    NgZorroAntdModule.forRoot()
  ],
  declarations: [ResultPage]
})
export class ResultPageModule {}
