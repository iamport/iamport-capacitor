import { Component, NgZone, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  title: string;
  response: ParamMap;
  isSuccess: boolean;
  type: string;
  typeToText: string;
  error_code: string;
  error_msg: string;
  imp_uid: string;
  merchant_uid: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.response = this.route.snapshot.paramMap;
    const imp_success = this.response.get('imp_success');
    const success = this.response.get('success');

    this.isSuccess =
      imp_success === undefined || imp_success === null
        ? success === 'true'
        : imp_success === 'true';
    this.type = this.response.get('type');
    this.typeToText = this.type === 'payment' ? '결제' : '본인인증';
    this.title = `${this.typeToText} 결과`;
    this.error_code = this.response.get('error_code');
    this.error_msg = this.response.get('error_msg');
    this.imp_uid = this.response.get('imp_uid');
    this.merchant_uid = this.response.get('merchant_uid');
  }

  onClickBack() {
    this.ngZone.run(() => this.router.navigate([`/${this.type}`]));
  }
}
