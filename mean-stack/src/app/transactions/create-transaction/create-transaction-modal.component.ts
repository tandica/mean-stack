import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-transaction-modal',
  templateUrl: './create-transaction-modal.component.html',
  styleUrls: ['./create-transaction-modal.component.scss'],
})
export class CreateTransactionComponent implements OnInit {
  newTransaction: FormGroup;
  ngOnInit(): void {
    this.createTransactionForm();
  }

  constructor(
    public dialogRef: MatDialogRef<CreateTransactionComponent>,
    public dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  createTransactionForm() {
    this.newTransaction = this.fb.group({
      date: [''],
      amount: [''],
      currency: [''],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.newTransaction.valid) {
      this.dialogRef.close(this.newTransaction.value);
    }
  }

  // openAddTransactionModal() {
  //   const dialogRef = this.dialog.open(CreateTransactionComponent, {
  //     width: '500px',
  //     data: {},
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed');
  //   });
  // }
}
