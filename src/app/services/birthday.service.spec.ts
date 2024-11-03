import { TestBed } from '@angular/core/testing';
import { BirthdayService } from './birthday.service';

describe('BirthdayService', () => {
  let service: BirthdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirthdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate age correctly', () => {
    const result = service.calculateAgeAndBirthday('John Doe', new Date(Date.UTC(2001, 1, 1)));
    expect(result.age).toBe(new Date().getUTCFullYear() - 2001);
  });

  it('should generate reversed name anagram', () => {
    const anagrams = service.generateAnagrams('John');
    expect(anagrams).toContain('nhoJ');
  });
 

  it('should return name info', () => {
    const nameInfo = service.getNameInfo('John');
    expect(nameInfo).toEqual({
      meaning: 'Significado do nome',
      origin: 'Origem do nome'
    });
  });

  it('should return correct zodiac sign for a given date', () => {
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 0, 21)))).toBe('Aquário');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 1, 19)))).toBe('Peixes');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 2, 21)))).toBe('Áries');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 3, 20)))).toBe('Touro');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 4, 21)))).toBe('Gêmeos');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 5, 21)))).toBe('Câncer');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 6, 23)))).toBe('Leão');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 7, 23)))).toBe('Virgem');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 8, 23)))).toBe('Libra');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 9, 23)))).toBe('Escorpião');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 10, 22)))).toBe('Sagitário');
    expect(service.getZodiacSign(new Date(Date.UTC(new Date().getUTCFullYear(), 11, 22)))).toBe('Capricórnio'); 
  });

  it('should return correct season for a given date', () => {
    expect(service.getSeason(new Date(Date.UTC(2000, 11, 21)))).toBe('Verão'); 
    expect(service.getSeason(new Date(Date.UTC(2000, 2, 21)))).toBe('Outono');
    expect(service.getSeason(new Date(Date.UTC(2000, 5, 21)))).toBe('Inverno');
    expect(service.getSeason(new Date(Date.UTC(2000, 8, 23)))).toBe('Primavera');
  });

  it('should correctly identify leap years', () => {
    expect(service.isLeapYear(2000)).toBe(true);
    expect(service.isLeapYear(1900)).toBe(false);
    expect(service.isLeapYear(2004)).toBe(true);
    expect(service.isLeapYear(2001)).toBe(false);
  });

  it('should return correct Chinese zodiac sign for a given year', () => {
    expect(service.getChineseZodiac(2000)).toBe('Dragão');
    expect(service.getChineseZodiac(2001)).toBe('Serpente');
    expect(service.getChineseZodiac(2002)).toBe('Cavalo');
    expect(service.getChineseZodiac(2003)).toBe('Cabra');
    expect(service.getChineseZodiac(2004)).toBe('Macaco');
  }); 
});
