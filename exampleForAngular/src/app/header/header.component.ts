import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  exportAs: 'app-header',
})
export class HeaderComponent {

  private _title = '';

  @Input()
  set title(title: string) {
    this._title = (title && title.trim()) || '<no title set>';
  }

  get title(): string { return this._title; }

}
