import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HoroscopeService } from './horoscope.service';

describe('HoroscopeService', () => {
  let service: HoroscopeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HoroscopeService]
    });
    service = TestBed.inject(HoroscopeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error if the sign is not found', () => {
    expect(() => service.getHoroscope('UnknownSign')).toThrowError('Signo não encontrado: UnknownSign');
  });

  it('should fetch horoscope for a given sign and day', () => {
    const mockResponse = { horoscope: 'Today is a good day.' };

    service.getHoroscope('Aquário').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://aztro.sameerkumar.website/?sign=aquarius&day=today');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should fetch horoscope for a given sign and specified day', () => {
    const mockResponse = { horoscope: 'Tomorrow will be better.' };

    service.getHoroscope('Aquário', 'tomorrow').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://aztro.sameerkumar.website/?sign=aquarius&day=tomorrow');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
