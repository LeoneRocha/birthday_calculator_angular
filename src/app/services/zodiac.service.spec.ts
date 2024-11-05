import { SIGN_COLORS, SIGN_ELEMENTS } from '../constants/ZodiacSignsConst';
import { ZodiacService } from './zodiac.service'; 

describe('ZodiacService', () => {
  let service: ZodiacService;
  beforeEach(() => {
    service = new ZodiacService();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return correct zodiac sign', () => {
    const birthdate = new Date(Date.UTC(1990, 2, 21)); // 21 de março de 1990
    const zodiacSign = service.getZodiacSign(birthdate);
    expect(zodiacSign).toBe('Áries'); // Supondo que 21 de março seja Áries em ZodiacSignsConst
  });
  it('should return correct Chinese zodiac', () => {
    const year = 1990;
    const chineseZodiac = service.getChineseZodiac(year);
    expect(chineseZodiac).toBe('Cavalo'); // 1990 é o ano do Cavalo
  });
  it('should return correct Chinese zodiac for base year', () => {
    const year = 2000;
    const chineseZodiac = service.getChineseZodiac(year);
    expect(chineseZodiac).toBe('Dragão'); // 2000 é o ano do Dragão
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
  it('should return correct Chinese zodiac sign for a given year', () => {
    expect(service.getChineseZodiac(2000)).toBe('Dragão');
    expect(service.getChineseZodiac(2001)).toBe('Serpente');
    expect(service.getChineseZodiac(2002)).toBe('Cavalo');
    expect(service.getChineseZodiac(2003)).toBe('Cabra');
    expect(service.getChineseZodiac(2004)).toBe('Macaco');
  });
  it('should fetch zodiac information correctly', () => {
    const birthdate = new Date(Date.UTC(1990, 3, 15)); // Abril é o mês 3 (0-indexado)
    const result = service.fetchZodiac(birthdate); 
    expect(result.signColor).toBe(SIGN_COLORS['Áries']);
    expect(result.signElement).toBe(SIGN_ELEMENTS['Áries']); 
  });
});