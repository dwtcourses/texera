import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalUserLoginComponent } from './ngbdmodal-user-login.component';
import { UserService } from '../../../../../common/service/user/user.service';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule, MatFormFieldModule, MatDialogModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserLoginComponent', () => {
  let component: NgbdModalUserLoginComponent;
  let fixture: ComponentFixture<NgbdModalUserLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdModalUserLoginComponent ],
      providers: [
        NgbActiveModal,
        UserService
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        NgbModule,
        FormsModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
