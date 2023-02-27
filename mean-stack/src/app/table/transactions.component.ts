import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TransactionsResponse, Transaction } from './transactions.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public filterByDate: FormGroup;
  public pipe: DatePipe;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  transactions: Transaction[] = [];
  dataSource = new MatTableDataSource<Transaction>(this.transactions);

  // dataSource: any;

  get startDate() {
    return this.filterByDate?.get('startDate')?.value ?? null;
  }

  get endDate() {
    return this.filterByDate?.get('endDate')?.value ?? null;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<TransactionsResponse>('http://localhost:8080/api/transactions')
      .pipe(map((response) => response.getAllTransactions))
      .subscribe((transactions) => {
        this.transactions = transactions;
      });

    this.filterByDate = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl(),
    });

    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data: any, filter: any) => {
      if (this.startDate && this.endDate) {
        return data.created >= this.startDate && data.created <= this.endDate;
      }
      return true;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    this.dataSource.filter = '' + Math.random();
  }
}
