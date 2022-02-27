import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css']
})
export class AppFormComponent implements OnInit {

  form: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AppFormComponent>,
              @Inject(MAT_DIALOG_DATA) private _data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: this._data.id,
      name: this._data.name,
      status: this._data.status,
      date: this._data.date
    })
  }

  submitForm() {
    this._data.name = this.form.getRawValue().name;
    this._data.status = this.form.getRawValue().status;
    this._data.date = this.form.getRawValue().date;

    this.dialogRef.close(this._data);
  }

}
