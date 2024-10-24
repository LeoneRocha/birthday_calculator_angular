import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BirthdayService } from '../../services/birthday.service';
@Component({
  selector: 'app-birthday-form',
  templateUrl: './birthday-form.component.html',
  styleUrls: ['./birthday-form.component.scss']
})
export class BirthdayFormComponent implements OnInit {
  birthdayForm: FormGroup;
  result: any;
  countdown$: Observable<string> = new Observable<string>();

  constructor(private fb: FormBuilder, private birthdayService: BirthdayService) {
    this.birthdayForm = this.fb.group({
      name: [''],
      birthdate: ['']
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const { name, birthdate } = this.birthdayForm.value;
    this.result = this.birthdayService.calculateAgeAndBirthday(name, birthdate);
    this.countdown$ = this.result.countdown$;
  }
}