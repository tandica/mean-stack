import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TransactionsResponse, Transaction } from './transactions.interface';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})

export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  transactions: Transaction[] = [];
  dataSource: any;
  // getAllTransactions: any[] =[]

  constructor(private http: HttpClient){}

  ngOnInit() {
    this.http.get<TransactionsResponse>('http://localhost:8080/api/transactions').pipe(
      map(response => response.getAllTransactions)
    ).subscribe(transactions => {
      this.transactions = transactions;
      console.log("obj", transactions)
    });

  }

// const obj = this.transactions
// 
// const transactionsArray = Object.keys(obj).map(function(key) {return obj[Number(key)]})
// console.log("arr", transactionsArray)
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
  }
