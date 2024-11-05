import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BirthdayFormComponent } from './components/birthday-form/birthday-form.component'; 
import { ZodiacService } from './services/zodiac.service';
import { NameService } from './services/name.service';
import { BirthDateService } from './services/birthdate.service';
import { ServerInfoComponent } from './components/server-info/server-info.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, BirthdayFormComponent,ServerInfoComponent],            
      imports: [ReactiveFormsModule],
      providers: [        
         ZodiacService // Adicione o serviço aqui
        , NameService
        , BirthDateService
    ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'birthday-calculator'`, () => {
    expect(component.title).toEqual('birthday-calculator');
  });

  it('should render app-birthday-form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-birthday-form')).not.toBeNull();
  });
});