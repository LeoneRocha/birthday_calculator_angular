import { TestBed } from '@angular/core/testing';
import { NameService } from './name.service';
import { ZodiacService } from './zodiac.service';
import { BirthDateService } from './birthdate.service';
import { of } from 'rxjs';
import { BirthdateInfoService } from './birthdateinfoservice.service';
import { SIGN_COLORS, SIGN_ELEMENTS } from '../constants/ZodiacSignsConst';

describe('BirthdateInfoService', () => {
  let service: BirthdateInfoService;
  let nameService: jest.Mocked<NameService>;
  let zodiacService: jest.Mocked<ZodiacService>;
  let birthdateService: jest.Mocked<BirthDateService>;

  beforeEach(() => {
    nameService = {
      calculateNumerology: jest.fn(),
      generateAnagrams: jest.fn(),
      getNameInfo: jest.fn()
    } as jest.Mocked<NameService>;

    zodiacService = {
      getChineseZodiac: jest.fn(),
      getZodiacSign: jest.fn(),
      fetchZodiac: jest.fn(),
    } as jest.Mocked<ZodiacService>;

    birthdateService = {
      getTodayUTC: jest.fn(),
      getDateForm: jest.fn(),
      getDateUTC: jest.fn(),
      calculateAge: jest.fn(),
      calculateNextBirthday: jest.fn(),
      calculateDaysUntilBirthday: jest.fn(),
      calculateHoursUntilBirthday: jest.fn(),
      calculateDaysLived: jest.fn(),
      getDayOfWeek: jest.fn(),
      getSeason: jest.fn(),
      isLeapYear: jest.fn(),
      startCountdown: jest.fn()
    } as jest.Mocked<BirthDateService>;

    TestBed.configureTestingModule({
      providers: [
        BirthdateInfoService,
        { provide: NameService, useValue: nameService },
        { provide: ZodiacService, useValue: zodiacService },
        { provide: BirthDateService, useValue: birthdateService }
      ]
    });

    service = TestBed.inject(BirthdateInfoService);
  });

  it('should calculate age and birthday information correctly', () => {
    const name = 'John Doe';
    const birthdate = '1990-01-01';
    const birthUTC = new Date(Date.UTC(1990, 0, 1));

    birthdateService.getDateForm.mockReturnValue(birthUTC);
    birthdateService.getTodayUTC.mockReturnValue(new Date(Date.UTC(2024, 10, 4)));
    birthdateService.getDateUTC.mockReturnValue(birthUTC);
    birthdateService.calculateAge.mockReturnValue(34);
    birthdateService.calculateNextBirthday.mockReturnValue(new Date(Date.UTC(2025, 0, 1)));
    birthdateService.calculateDaysUntilBirthday.mockReturnValue(58);
    birthdateService.calculateHoursUntilBirthday.mockReturnValue(1392);
    birthdateService.calculateDaysLived.mockReturnValue(12784);
    birthdateService.getDayOfWeek.mockReturnValue('segunda-feira');
    birthdateService.getSeason.mockReturnValue('Inverno');
    birthdateService.isLeapYear.mockReturnValue(false);
    zodiacService.getChineseZodiac.mockReturnValue('Cavalo');
    zodiacService.getZodiacSign.mockReturnValue('Capricórnio');
    nameService.calculateNumerology.mockReturnValue(7);
    nameService.generateAnagrams.mockReturnValue(['eoD nhoJ']);
    nameService.getNameInfo.mockReturnValue({ meaning: 'Significado do nome', origin: 'Origem do nome' });
    birthdateService.startCountdown.mockReturnValue(of('0d 0h 0m 0s'));

    zodiacService.fetchZodiac.mockReturnValue({ signColor: SIGN_COLORS["Capricórnio"], signElement: SIGN_ELEMENTS["Capricórnio"] });

    const result = service.calculateAgeAndBirthday(name, birthdate);

    expect(result).toEqual({
      birthDate: birthUTC,
      age: 34,
      daysUntilBirthday: 58,
      hoursUntilBirthday: 1392,
      nextBirthday: new Date(Date.UTC(2025, 0, 1)),
      zodiacSign: 'Capricórnio',
      daysLived: 12784,
      dayOfWeek: 'segunda-feira',
      season: 'Inverno',
      isLeapYear: false,
      chineseZodiac: 'Cavalo',
      numerology: 7,
      anagrams: ['eoD nhoJ'],
      nameInfo: { meaning: 'Significado do nome', origin: 'Origem do nome' },
      countdown$: expect.anything(),
      signColor: SIGN_COLORS["Capricórnio"],
      signElement: SIGN_ELEMENTS["Capricórnio"],
    });
  });
});
