import { interval, map, Observable } from "rxjs";
import { SeasonsConst } from "../constants/ZodiacSignsConst";

export class BirthDateService {

  calculateDaysUntilBirthday(today: Date, nextBirthday: Date): number {
    return Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }
  calculateHoursUntilBirthday(today: Date, nextBirthday: Date): number {
    return Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60));
  }
  calculateDaysLived(today: Date, birthUTC: Date): number {
    return Math.floor((today.getTime() - birthUTC.getTime()) / (1000 * 60 * 60 * 24));
  }
  getDayOfWeek(birthUTC: Date): string {
    return birthUTC.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' });
  }
  getSeason(birthdate: Date): string {
    const month = birthdate.getUTCMonth() + 1;
    const day = birthdate.getUTCDate();

    for (const season of SeasonsConst) {
      if (
        (month === season.startMonth && day >= season.startDay) ||
        (month === season.endMonth && day <= season.endDay) ||
        (month > season.startMonth && month < season.endMonth)
      ) {
        return season.name;
      }
    }
    return "";
  }
  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
  startCountdown(birthdate: Date): Observable<string> {
    return interval(1000).pipe(
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
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      })
    );
  }
  getDateUTC(myDate: Date): Date {
    const dateUTC = new Date(Date.UTC(myDate.getUTCFullYear(), myDate.getUTCMonth(), myDate.getUTCDate()));
    return dateUTC;
  }
  getTodayUTC(): Date {
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    return todayUTC;
  }
  calculateNextBirthday(birthdate: Date): Date {
    const todayUTC = this.getTodayUTC();
    const birthUTC = this.getDateUTC(birthdate);
    // Cria a data do próximo aniversário no ano atual
    let nextBirthday = new Date(Date.UTC(todayUTC.getUTCFullYear(), birthUTC.getUTCMonth(), birthUTC.getUTCDate() + 1));

    // Se a data de hoje for maior ou igual ao próximo aniversário, ajusta para o próximo ano
    if (todayUTC >= nextBirthday) {
      nextBirthday.setUTCFullYear(todayUTC.getUTCFullYear() + 1);
    }

    // Ajusta a data para garantir que não haja problemas de fuso horário
    nextBirthday.setUTCHours(0, 0, 0, 0);
    //nextBirthday.setUTCDate(nextBirthday.getUTCDate() + 1);

    return nextBirthday;
  }

  calculateAge(birthdate: Date): number {
    const todayUTC = this.getTodayUTC();
    const birthUTC = this.getDateUTC(birthdate);
    let age = todayUTC.getUTCFullYear() - birthUTC.getUTCFullYear();
    return age;
  }

  getDateForm(birthdate: any): Date {
    // Verifica se birthdate é uma instância de Date, caso contrário, converte
    let birth: Date;
    if (birthdate instanceof Date) {
      birth = birthdate;
    } else {
      // Converte a string para Date sem perder o dia
      const [year, month, day] = birthdate.split('-').map(Number);
      birth = new Date(year, month - 1, day);
      // Ajusta a data para o fuso horário local
      birth.setHours(0, 0, 0, 0);
    }
    if (isNaN(birth.getTime())) {
      throw new Error('Invalid birthdate');
    }
    return birth;
  }
}