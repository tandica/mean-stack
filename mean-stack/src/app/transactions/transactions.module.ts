import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsTableComponent,
  },
];

@NgModule({
  declarations: [
    TransactionsTableComponent,
    AddTransactionComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [

  ],
  bootstrap: [],
})
export class TransactionsModule {}
