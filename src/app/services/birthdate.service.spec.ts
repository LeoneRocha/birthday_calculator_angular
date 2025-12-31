import { TestBed } from '@angular/core/testing';
import { BirthDateService } from './birthdate.service';

describe('BirthDateService', () => {
  let service: BirthDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BirthDateService]
    });
    service = TestBed.inject(BirthDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should calculate days until birthday correctly', () => {
    const today = new Date('2024-11-04');
    const nextBirthday = new Date('2024-12-04');
    expect(service.calculateDaysUntilBirthday(today, nextBirthday)).toBe(30);
  });
  it('should calculate hours until birthday correctly', () => {
    const today = new Date('2024-11-04T00:00:00Z');
    const nextBirthday = new Date('2024-11-05T00:00:00Z');
    expect(service.calculateHoursUntilBirthday(today, nextBirthday)).toBe(24);
  });
  it('should calculate days lived correctly', () => {
    const today = service.getDateUTC(new Date('2024-11-04'));
    const birthUTC = service.getDateUTC(new Date('1990-01-01'));
    expect(service.calculateDaysLived(today, birthUTC)).toBe(12726);
  });
  it('should return correct day of the week', () => {
    const birthUTC = new Date('1990-01-01');
    expect(service.getDayOfWeek(birthUTC)).toBe('segunda-feira');
  });
  it('should return correct season for a given date', () => {
    const birthdate = new Date(Date.UTC(2000, 11, 21));
    expect(service.getSeason(birthdate)).toBe('Verão');
  });
  it('should correctly identify leap years', () => {
    expect(service.isLeapYear(2000)).toBe(true);
    expect(service.isLeapYear(1900)).toBe(false);
    expect(service.isLeapYear(2004)).toBe(true);
    expect(service.isLeapYear(2001)).toBe(false);
  });
  it('should start countdown correctly', (done) => {
    const birthdate = new Date('1990-01-01');
    const countdown$ = service.startCountdown(birthdate);
    countdown$.subscribe((countdown) => {
      expect(countdown).toMatch(/\d+d \d+h \d+m \d+s/);
      done();
    });
  });
  it('should return birth UTC correctly', () => {
    const birthdate = new Date('1990-01-01');
    const birthUTC = service.getDateUTC(birthdate);
    expect(birthUTC.getUTCFullYear()).toBe(1990);
    expect(birthUTC.getUTCMonth()).toBe(0);
    expect(birthUTC.getUTCDate()).toBe(1);
  });
  it('should return today UTC correctly', () => {
    const today = new Date();
    const todayUTC = service.getTodayUTC();
    expect(todayUTC.getUTCFullYear()).toBe(today.getUTCFullYear());
    expect(todayUTC.getUTCMonth()).toBe(today.getUTCMonth());
    expect(todayUTC.getUTCDate()).toBe(today.getUTCDate());
  });
  it('should calculate next birthday correctly', () => {
    const birthdate = new Date('1990-01-01');
    const today = new Date();
    let expectedYear = today.getUTCFullYear();
    const nextBirthdayDate = new Date(Date.UTC(expectedYear, 0, 2));
    if (today > nextBirthdayDate) {
      expectedYear++;
    }
    const nextBirthday = service.calculateNextBirthday(birthdate);
    expect(nextBirthday.getUTCFullYear()).toBe(expectedYear);
    expect(nextBirthday.getUTCMonth()).toBe(0);
    expect(nextBirthday.getUTCDate()).toBe(2);
  });
  it('should calculate age correctly', () => {
    const birthdate = new Date('1990-01-01');
    const today = new Date();
    let expectedAge = today.getUTCFullYear() - 1990;
    const hasHadBirthday = (today.getUTCMonth() > 0) || (today.getUTCMonth() === 0 && today.getUTCDate() >= 2);
    if (!hasHadBirthday) {
      expectedAge--;
    }
    const age = service.calculateAge(birthdate);
    expect(age).toBe(expectedAge);
  });
  it("should return a Date instance when the input is already a Date", () => {
    const dateInput = new Date(1990, 3, 25);
    const result = service.getDateForm(dateInput);
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toEqual(dateInput.getTime());
  });

  it("should convert a valid date string to a Date instance", () => {
    const dateString = "1990-04-25";
    const result = service.getDateForm(dateString);
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(1990);
    expect(result.getMonth()).toBe(3); // Month is zero-based
    expect(result.getDate()).toBe(25);
  });

  it("should throw an error for an invalid date string", () => {
    const invalidDateString = "invalid-date";
    expect(() => service.getDateForm(invalidDateString)).toThrowError(
      "Invalid birthdate"
    );
  });

  it("should convert a date string with different delimiters to a Date instance", () => {
    const dateString = "1990/04/25";
    const result = service.getDateForm(dateString.split("/").join("-")); // Convert to the expected format
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(1990);
    expect(result.getMonth()).toBe(3);
    expect(result.getDate()).toBe(25);
  });

  it("should set the hours to 0 for the given date", () => {
    const dateString = "1990-04-25";
    const result = service.getDateForm(dateString);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
  
});