import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  calculateAgeAndBirthday(name: string, birthdate: Date): any {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());

    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const hoursUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60));
    const daysLived = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const dayOfWeek = birth.toLocaleDateString('pt-BR', { weekday: 'long' });
    const season = this.getSeason(birth);
    const isLeapYear = this.isLeapYear(birth.getFullYear());
    const chineseZodiac = this.getChineseZodiac(birth.getFullYear());
    const zodiacSign = this.getZodiacSign(birth);
    const numerology = this.calculateNumerology(name);
    const anagrams = this.generateAnagrams(name);
    const nameInfo = this.getNameInfo(name);

    return { age, daysUntilBirthday, hoursUntilBirthday, nextBirthday, zodiacSign, daysLived, dayOfWeek, season, isLeapYear, chineseZodiac, numerology, anagrams, nameInfo };
  }

  calculateNumerology(name: string): number {
    const letters = name.toUpperCase().replace(/[^A-Z]/g, '');
    const letterValues : any  = {
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
    // Função simples para dividir o nome em sílabas e reorganizá-las
    const syllables = name.match(/[^aeiou]*[aeiou]+/gi) || [];
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
    const month = birthdate.getMonth() + 1;
    const day = birthdate.getDate();

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Aquário';
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Peixes';
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Áries';
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Touro';
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Gêmeos';
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Câncer';
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Leão';
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Virgem';
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'Libra';
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'Escorpião';
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'Sagitário';
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return 'Capricórnio';

    return '';
  }

  getSeason(birthdate: Date): string {
    const month = birthdate.getMonth() + 1;
    const day = birthdate.getDate();

    // Estações do ano no hemisfério sul
    if ((month == 12 && day >= 21) || (month <= 3 && day <= 20)) return 'Verão';
    if ((month == 3 && day >= 21) || (month <= 6 && day <= 20)) return 'Outono';
    if ((month == 6 && day >= 21) || (month <= 9 && day <= 22)) return 'Inverno';
    if ((month == 9 && day >= 23) || (month <= 12 && day <= 20)) return 'Primavera';

    return '';
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  getChineseZodiac(year: number): string {
    const animals = ['Rato', 'Boi', 'Tigre', 'Coelho', 'Dragão', 'Serpente', 'Cavalo', 'Cabra', 'Macaco', 'Galo', 'Cão', 'Porco'];
    return animals[year % 12];
  }
}
