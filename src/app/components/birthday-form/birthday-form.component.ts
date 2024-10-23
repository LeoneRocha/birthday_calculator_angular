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
    this.startCountdown(this.result.nextBirthday);
  }

  startCountdown(nextBirthday: Date): void {
    interval(1000).pipe(
      map(() => {
        const now = new Date();
        const timeDiff = nextBirthday.getTime() - now.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        this.countdown = `${hours}h ${minutes}m ${seconds}s`;
      })
    ).subscribe();
  }
}
