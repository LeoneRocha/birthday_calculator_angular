import { Component, Input, OnInit } from '@angular/core';
import { HoroscopeService } from '../../services/horoscope.service';

@Component({
  selector: 'app-horoscope',
  templateUrl: './horoscope.component.html',
  styleUrl: './horoscope.component.scss'
})
export class HoroscopeComponent implements OnInit {
  @Input() sign: string = '';
  horoscope: any;
  

  constructor(private readonly horoscopeService: HoroscopeService) { }

  ngOnInit() {
    this.horoscopeService.getHoroscope(this.sign).subscribe(data => {
      this.horoscope = data;
    });
  }
}