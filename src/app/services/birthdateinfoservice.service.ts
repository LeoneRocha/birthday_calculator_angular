import { Injectable } from '@angular/core';
import { NameService } from './name.service';
import { ZodiacService } from './zodiac.service';
import { BirthDateService } from './birthdate.service';

@Injectable({
  providedIn: 'root'
})
export class BirthdateInfoService {

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly nameService: NameService,
    private readonly birthdateService: BirthDateService
  ) {
  }
  calculateAgeAndBirthday(name: string, birthdate: Date | string): any {
    // Verifica se birthdate é uma instância de Date, caso contrário, converte
    let birthUTC = this.birthdateService.getDateForm(birthdate);
    if (birthUTC === undefined) {
      throw new Error('Invalid birthdate');
    }
    const today = this.birthdateService.getTodayUTC();
    const age = this.birthdateService.calculateAge(birthUTC);
    const nextBirthday = this.birthdateService.calculateNextBirthday(birthUTC);
    const daysUntilBirthday = this.birthdateService.calculateDaysUntilBirthday(today, nextBirthday);
    const hoursUntilBirthday = this.birthdateService.calculateHoursUntilBirthday(today, nextBirthday);
    const daysLived = this.birthdateService.calculateDaysLived(today, birthUTC);
    const dayOfWeek = this.birthdateService.getDayOfWeek(birthUTC);
    const season = this.birthdateService.getSeason(birthUTC);
    const isLeapYear = this.birthdateService.isLeapYear(birthUTC.getUTCFullYear());
    const chineseZodiac = this.zodiacService.getChineseZodiac(birthUTC.getUTCFullYear());
    const zodiacSign = this.zodiacService.getZodiacSign(birthUTC);
    const numerology = this.nameService.calculateNumerology(name);
    const anagrams = this.nameService.generateAnagrams(name);
    const nameInfo = this.nameService.getNameInfo(name); 
    const zodiacData = this.zodiacService.fetchZodiac(birthUTC);    
    const signColor = zodiacData.signColor;
    const signElement = zodiacData.signElement;
    return {
      birthDate: birthUTC,
      age,
      daysUntilBirthday,
      hoursUntilBirthday,
      nextBirthday,
      zodiacSign,
      daysLived,
      dayOfWeek,
      season,
      isLeapYear,
      chineseZodiac,
      numerology,
      anagrams,
      nameInfo,
      countdown$: this.birthdateService.startCountdown(birthUTC), 
      signColor,
      signElement
    };
  } 
}