import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CertificationPage } from './certification.page';

describe('CertificationPage', () => {
  let component: CertificationPage;
  let fixture: ComponentFixture<CertificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
