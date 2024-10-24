import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { BirthdayService } from '../../services/birthday.service';
 
@Component({
  selector: 'app-birthday-form',
  templateUrl: './birthday-form.component.html',
  styleUrls: ['./birthday-form.component.scss']
})
export class BirthdayFormComponent implements OnInit {
  birthdayForm: FormGroup;
  result: any;
  countdown: string = '';

  constructor(private fb: FormBuilder, private birthdayService: BirthdayService) {
    this.birthdayForm = this.fb.group({
      name: [''],
      birthdate: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { name, birthdate } = this.birthdayForm.value;
    this.result = this.birthdayService.calculateAgeAndBirthday(name, birthdate);
    this.startCountdown(this.result.birthDate);
  }

  startCountdown(birthdate: Date): void {
    interval(1000).pipe(
      map(() => {
        const now = new Date();
        let nextBirthday = new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());

        // Se o próximo aniversário já passou neste ano, ajuste para o próximo ano
        if (now > nextBirthday) {
          nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const timeDiff = nextBirthday.getTime() - now.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      })
    ).subscribe();
  }
}
