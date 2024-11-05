import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BirthdayFormComponent } from './birthday-form.component';
import { BirthdateInfoService } from '../../services/birthdateinfoservice.service';
import { ServerInfoComponent } from '../server-info/server-info.component'; // Importe o componente
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BirthdayFormComponent', () => {
  let component: BirthdayFormComponent;
  let fixture: ComponentFixture<BirthdayFormComponent>;
  let birthdayServiceMock: any;

  beforeEach(async () => {
    birthdayServiceMock = {
      calculateAgeAndBirthday: jest.fn().mockReturnValue({
        countdown$: of('10 days left')
      })
    };

    await TestBed.configureTestingModule({
      declarations: [
        BirthdayFormComponent,
        ServerInfoComponent // Declare o componente aqui
      ],
      imports: [ReactiveFormsModule],
      providers: [{ provide: BirthdateInfoService, useValue: birthdayServiceMock }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Adicione esta linha

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call calculateAgeAndBirthday on submit', () => {
    component.birthdayForm.setValue({ name: 'John Doe', birthdate: '1990-01-01' });
    component.onSubmit();
    expect(birthdayServiceMock.calculateAgeAndBirthday).toHaveBeenCalledWith('John Doe', '1990-01-01');
    component.countdown$.subscribe(countdown => {
      expect(countdown).toBe('10 days left');
    });
  });
});
