import { Component } from '@angular/core';
import { IamportService } from '../iamport.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private iamPort: IamportService) {}
}
