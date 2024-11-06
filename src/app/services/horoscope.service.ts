import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { SignsMapConst } from '../constants/ZodiacSignsConst';
@Injectable({
  providedIn: 'root'
})
export class HoroscopeService {
  private readonly apiUrl = 'https://aztro.sameerkumar.website/?sign=';

  constructor(private readonly http: HttpClient) { }
  getHoroscope(sign: string, day: string = 'today'): Observable<any> {
    const englishSign: string = SignsMapConst[sign];
    if (!englishSign) {
      throw new Error(`Signo não encontrado: ${sign}`);
    }
    return this.http.post(`${this.apiUrl}${englishSign}&day=${day}`, {});
  } 
}