import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content class="mat-typography">
      <h3>{{ data.content }}</h3>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button mat-dialog-close>No</button>
      <button
        mat-raised-button
        color="warn"
        cdkFocusInitial
        (click)="confirmAction()"
      >
        Yes
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public confirmAction(): void {
    this.dialogRef.close(true);
  }
}
