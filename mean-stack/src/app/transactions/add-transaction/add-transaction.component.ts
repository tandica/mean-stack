import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../../shared/models/transaction.model';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css'],
})
export class AddTransactionComponent {
  public isEdit: boolean = false;
  public transactionForm = new Transaction();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private matDialogRef: MatDialogRef<AddTransactionComponent>,
    private transaction: TransactionService
    ) {
    if (data) {
      this.isEdit = true;
      this.transactionForm = data;
    }

  }

  public handleSubmit(): void {
    if (this.isEdit) {
      this.transaction
        .updateTransaction(this.transactionForm)
        .subscribe((res) => {
          this.matDialogRef.close(true);
        });
    } else {
      delete this.transactionForm._id;
      this.transaction.addTransaction(this.transactionForm).subscribe((res) => {
        this.matDialogRef.close(true);
      });
    }
  }
}
