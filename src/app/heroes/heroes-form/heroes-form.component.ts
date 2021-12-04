import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-heroes-form',
  templateUrl: './heroes-form.component.html',
  styleUrls: ['./heroes-form.component.scss'],
})
export class HeroesFormComponent implements OnInit {
  form: FormGroup;
  @Input() formTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<HeroesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit(): void {
    this.formTitle = this.dialogData?.id ? 'EDIT HERO' : 'NEW HERO';
    this.form = this.fb.group({
      name: [
        this.dialogData?.name ? this.dialogData.name : '',
        Validators.required,
      ],
      age: [
        this.dialogData?.age ? this.dialogData.age : '',
        [Validators.required, Validators.max(5000), Validators.min(1)],
      ],
      description: [
        this.dialogData?.description ? this.dialogData.description : '',
        Validators.required,
      ],
      weakness: [
        this.dialogData?.weakness ? this.dialogData.weakness : '',
        Validators.required,
      ],
    });
  }
  cancel() {
    this.dialogRef.close();
  }
  submit() {
    if (this.form.valid)
      this.dialogRef.close({ id: this.dialogData?.id, ...this.form.value });
  }
}
