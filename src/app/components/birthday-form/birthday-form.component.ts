import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BirthdateInfoService } from '../../services/birthdateinfoservice.service';

@Component({
  selector: 'app-birthday-form',
  templateUrl: './birthday-form.component.html',
  styleUrls: ['./birthday-form.component.scss']
})
export class BirthdayFormComponent implements OnInit {
  birthdayForm: FormGroup;
  result: any;
  countdown$: Observable<string> = new Observable<string>();
  currentYear: number;
  appVersion: string;

  constructor(private readonly fb: FormBuilder, private readonly birthdayService: BirthdateInfoService) {
    this.birthdayForm = this.fb.group({
      name: [''],
      birthdate: ['']
    });
    this.currentYear = new Date().getFullYear();
    this.appVersion = '2024.11.04.0'; // Certifique-se de que a versão correta seja atribuída aqui
  }

  ngOnInit(): void {
    console.log('called OnInit');
  }

  onSubmit(): void {
    const { name, birthdate } = this.birthdayForm.value;
    this.result = this.birthdayService.calculateAgeAndBirthday(name, birthdate);
    this.countdown$ = this.result.countdown$;
  }
}
