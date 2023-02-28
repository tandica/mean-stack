import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { CreateTransactionComponent } from './create-transaction/create-transaction-modal.component';

@NgModule({
  declarations: [CreateTransactionComponent],
  imports: [CommonModule, MaterialModule],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
