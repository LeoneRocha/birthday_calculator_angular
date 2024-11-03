import { Injectable } from '@angular/core';
import { interval, map, Observable } from 'rxjs';
import { SeasonsConst, ZodiacSignsConst } from '../constants/ZodiacSignsConst';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  calculateAgeAndBirthday(name: string, birthdate: Date | string): any {
    // Verifica se birthdate é uma instância de Date, caso contrário, converte
    const birth = birthdate instanceof Date ? birthdate : new Date(birthdate);

    if (isNaN(birth.getTime())) {
      throw new Error('Invalid birthdate');
    }

    const today = new Date();
    const birthUTC = new Date(Date.UTC(birth.getUTCFullYear(), birth.getUTCMonth(), birth.getUTCDate()));
    let age = today.getUTCFullYear() - birthUTC.getUTCFullYear();
    const nextBirthday = new Date(Date.UTC(today.getUTCFullYear(), birth.getUTCMonth(), birth.getUTCDate()));

    if (today > nextBirthday) {
      nextBirthday.setUTCFullYear(today.getUTCFullYear() + 1);
    }

    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const hoursUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60));
    const daysLived = Math.floor((today.getTime() - birthUTC.getTime()) / (1000 * 60 * 60 * 24));
    const dayOfWeek = birthUTC.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' });
    const season = this.getSeason(birthUTC);
    const isLeapYear = this.isLeapYear(birthUTC.getUTCFullYear());
    const chineseZodiac = this.getChineseZodiac(birthUTC.getUTCFullYear());
    const zodiacSign = this.getZodiacSign(birthUTC);
    const numerology = this.calculateNumerology(name);
    const anagrams = this.generateAnagrams(name);
    const nameInfo = this.getNameInfo(name);

    return { birthDate: birthUTC, age, daysUntilBirthday, hoursUntilBirthday, nextBirthday, zodiacSign, daysLived, dayOfWeek, season, isLeapYear, chineseZodiac, numerology, anagrams, nameInfo, countdown$: this.startCountdown(birthUTC) };
  }

  calculateNumerology(name: string): number {
    const letters = name.toUpperCase().replace(/[^A-Z]/g, '');
    const letterValues: any = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
      S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    };

    let sum = 0;
    for (const letter of letters) {
      sum += letterValues[letter];
    }

    while (sum > 9) {
      sum = sum.toString().split('').reduce((acc, num) => acc + parseInt(num, 10), 0);
    }

    return sum;
  }

  generateAnagrams(name: string): string[] {
    const reversedName = name.split('').reverse().join('');
    const syllableCoesions = this.getSyllableCoesions(name);
    return [reversedName, ...syllableCoesions];
  }
  getSyllableCoesions(name: string): string[] { 
    const syllables = name.split(/[^aeiou]/gi).filter(s => s);
    const coesions: string[] = [];

    const generate = (prefix: string, remaining: string[]) => {
      if (remaining.length === 0) {
        coesions.push(prefix);
      } else {
        for (let i = 0; i < remaining.length; i++) {
          generate(prefix + remaining[i], remaining.slice(0, i).concat(remaining.slice(i + 1)));
        }
      }
    };

    generate('', syllables);
    return coesions;
  }


  getNameInfo(name: string): any {
    // Esta função pode ser expandida para buscar informações reais de APIs ou bases de dados
    return {
      meaning: "Significado do nome",
      origin: "Origem do nome"
    };
  }



  getZodiacSign(birthdate: Date): string {
    const month = birthdate.getUTCMonth() + 1;
    const day = birthdate.getUTCDate();
    for (const sign of ZodiacSignsConst) {
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign.name;
      }
    }
    return "";
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

  getChineseZodiac(year: number): string {
    const animals = ['Rato', 'Boi', 'Tigre', 'Coelho', 'Dragão', 'Serpente', 'Cavalo', 'Cabra', 'Macaco', 'Galo', 'Cão', 'Porco'];
    const baseYear = 2000; // 2000 é o ano do Dragão
    const index = (year - baseYear + 4) % 12; // Ajusta o índice para alinhar com o ano do Dragão
    return animals[(index + 12) % 12]; // Adiciona 12 para garantir um índice positivo
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
}