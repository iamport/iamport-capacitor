import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Carrier, CertificationData } from '../../../../dist/esm';
import { CARRIERS } from 'src/constants';
import { IamportService } from '../iamport.service';
@Component({
  selector: 'app-certification',
  templateUrl: './certification.page.html',
  styleUrls: ['./certification.page.scss'],
})
export class CertificationPage implements OnInit {
  title: string = '본인인증 테스트';
  carrier: Carrier = 'KTF';
  carriers = CARRIERS;

  validateForm: FormGroup;

  constructor(
    private iamport: IamportService,
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.carrier = 'KTF';
    this.initializeValidateForm();
  }

  initializeValidateForm(): void {
    this.validateForm = this.fb.group({
      merchant_uid: [`mid_${new Date().getTime()}`, [Validators.required]],
      name: ['최소리'],
      phone: ['01065791337'],
      carrier: ['KTF'],
      company: ['SIOT'],
      min_age: [null],
    });
  }

  onChangeCarrier(carrier: Carrier) {
    this.carrier = carrier;
  }

  submitForm(): void {
    const { controls, status, value } = this.validateForm;
    for (const i in controls) {
      controls[i].markAsDirty();
      controls[i].updateValueAndValidity();
    }

    if (status === 'VALID') {
      // const imp = new IMP();
      const userCode: string = 'imp10391932';
      const { merchant_uid, company, carrier, name, phone, min_age } = value;

      const data: CertificationData = {
        merchant_uid,
      };

      if (company) {
        data.company = company;
      }
      if (carrier) {
        data.carrier = carrier;
      }
      if (name) {
        data.name = name;
      }
      if (phone) {
        data.phone = phone;
      }
      if (min_age) {
        data.min_age = min_age;
      }

      // const options = {
      //   userCode,
      //   data,
      //   callback: this.callback,
      // };

      this.iamport.certification(userCode, data);
    }
  }

  callback = (response: Response) => {
    this.ngZone.run(() =>
      this.router.navigate(['/result', { ...response, type: 'certification' }]),
    );
  };
}
