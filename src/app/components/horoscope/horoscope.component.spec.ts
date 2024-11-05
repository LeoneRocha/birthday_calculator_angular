import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HoroscopeComponent } from './horoscope.component';
import { HoroscopeService } from '../../services/horoscope.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HoroscopeComponent', () => {
  let component: HoroscopeComponent;
  let fixture: ComponentFixture<HoroscopeComponent>;
  let horoscopeService: HoroscopeService;

  beforeEach(async () => {
    const horoscopeServiceMock = {
      getHoroscope: jest.fn().mockReturnValue(of({ horoscope: 'Today is a good day.' }))
    };

    await TestBed.configureTestingModule({
      declarations: [HoroscopeComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HoroscopeService, useValue: horoscopeServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoroscopeComponent);
    component = fixture.componentInstance;
    horoscopeService = TestBed.inject(HoroscopeService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load horoscope on init', () => {
    const sign = 'Aquário';
    component.sign = sign;

    fixture.detectChanges();

    expect(horoscopeService.getHoroscope).toHaveBeenCalledWith(sign);
    expect(component.horoscope).toEqual({ horoscope: 'Today is a good day.' });
  });
});
