import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionComponent } from './add-transaction.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../shared/modules/material.module';
import { Transaction } from '../../shared/models/transaction.model';

describe('AddTransactionComponent', () => {
  let component: AddTransactionComponent;
  let fixture: ComponentFixture<AddTransactionComponent>;
  let matDialogRefMock: MatDialogRef<AddTransactionComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        AngularMaterialModule,
      ],
      declarations: [AddTransactionComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    component.transactionForm = {
      _id: '',
      date: '',
      sender: {
        firstName: 'Hi',
        lastName: '',
        dateOfBirth: '',
        IDNumber: '',
      },
      recipient: {
        firstName: '',
        lastName: '',
        email: '',
        accountNumber: '',
        bank: '',
      },
      amount: '',
      currency: '',
      comments: '',
      status: '',
    };

    expect(component).toBeTruthy();
  });

  xit('should update heading text if isEdit is true', () => {
    component.transactionForm = new Transaction();

    // Set isEdit to true
    component.isEdit = true;
    fixture.detectChanges();

    // Check that the heading text has been updated
    const headingElement = fixture.nativeElement.querySelector('h4');
    expect(headingElement.textContent).toContain('Edit');

    // Set isEdit to false
    component.isEdit = false;
    fixture.detectChanges();

    // Check that the heading text has been updated again
    expect(headingElement.textContent).toContain('Add');
  });
});
