import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class HoroscopeService {
  private readonly apiUrl = 'https://aztro.sameerkumar.website/?sign=';
  private readonly signsMap: any = {
    'Aquário': 'aquarius',
    'Peixes': 'pisces',
    'Áries': 'aries',
    'Touro': 'taurus',
    'Gêmeos': 'gemini',
    'Câncer': 'cancer',
    'Leão': 'leo',
    'Virgem': 'virgo',
    'Libra': 'libra',
    'Escorpião': 'scorpio',
    'Sagitário': 'sagittarius',
    'Capricórnio': 'capricorn'
  };
  constructor(private readonly http: HttpClient) { }
  getHoroscope(sign: string, day: string = 'today'): Observable<any> {
    const englishSign: string = this.signsMap[sign];
    if (!englishSign) {
      throw new Error(`Signo não encontrado: ${sign}`);
    }
    return this.http.post(`${this.apiUrl}${englishSign}&day=${day}`, {});
  } 
}