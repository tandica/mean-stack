import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../../shared/modules/material.module';
import { TransactionsTableComponent } from './transactions-table.component';

describe('TransactionsTableComponent', () => {
  let component: TransactionsTableComponent;
  let fixture: ComponentFixture<TransactionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AngularMaterialModule, MatDialogModule,  BrowserAnimationsModule, FormsModule],
      declarations: [TransactionsTableComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear filter', ()=> {
    let filters = {
      status: "COMPLETED",
      startDate: "2021-01-01",
      endDate: "2021-01-31"
    }
    component.filters = filters;
    component.clear();
    expect(component.filters).toEqual({});
  })

  it('should set filters', () => {
    let filters = {
      status: "COMPLETED",
      startDate: "2021-01-01",
      endDate: "2021-01-31"
    }
    component.applyFilters(filters);
    expect(component.filters).toEqual(filters);
  })




});
