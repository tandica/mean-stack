import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  TransactionI,
  TransactionsResponse,
} from 'src/app/shared/interfaces/transaction.interface';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { ConfirmationDialogComponent } from '../../shared/component/confirmation-dialog.component';
import { TransactionService } from '../services/transaction.service';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css'],
})
export class TransactionsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public totalCount;
  public currentPage: number = 1;
  public pageSize: number = 5;
  public transactions: TransactionI[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public filters: { [key: string]: string } = {};

  constructor(
    private transaction: TransactionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTransactionList();
  }

  private getTransactionList(): void {
    this.transaction
      .getTransactions(this.currentPage, this.pageSize)
      .subscribe((transactions: any) => {
        this.transactions = [...transactions.getAllTransactions];
        this.dataSource.data = [...this.transactions];
        this.totalCount = transactions.totalCount;
      });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((page) => {
      this.currentPage = page.pageIndex + 1;
      this.pageSize = page.pageSize;
      if (
        this.filters['status'] ||
        this.filters['startDate'] ||
        this.filters['endDate']
      ) {
        this.StatusFilter();
      } else {
        this.getTransactionList();
      }
    });
  }

  openAddTransactionModal() {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      minWidth: '500px',
      minHeight: '300px',
      maxHeight: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTransactionList();
    });
  }

  openEditTransactionModal(transaction: TransactionI) {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      minWidth: '500px',
      minHeight: '300px',
      maxHeight: '500px',
      data: transaction,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTransactionList();
    });
  }

  public openDeleteTransactionModal(transaction: TransactionI) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Transaction',
        content: 'Are you sure you want to delete this transaction?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transaction.deleteTransaction(transaction).subscribe((res) => {
          this.getTransactionList();
        });
      }
    });
  }

  public StatusFilter() {
    this.transaction
      .getFilters(this.currentPage, this.pageSize, this.filters)
      .subscribe((transactions: any) => {
        this.transactions = transactions.getAllTransactions;
        this.totalCount = transactions.totalCount;
        this.dataSource.data = this.transactions;
      });
  }

  public applyFilters(form: any) {
    this.filters = form;
    this.StatusFilter();
  }

  public clear() {
    this.filters = {};
    this.getTransactionList();
  }
}
