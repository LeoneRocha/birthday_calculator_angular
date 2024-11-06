import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { BirthdayFormComponent } from './components/birthday-form/birthday-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServerInfoComponent } from './components/server-info/server-info.component';
import { NgIconsModule } from '@ng-icons/core';
import { simpleAngular, simpleTypescript, simpleJest, simpleNodedotjs } from '@ng-icons/simple-icons';
import { HoroscopeComponent } from './components/horoscope/horoscope.component'; 
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BirthdateInfoService } from './services/birthdateinfoservice.service';
import { ZodiacService } from './services/zodiac.service';
import { NameService } from './services/name.service';
import { BirthDateService } from './services/birthdate.service';

@NgModule({
  declarations: [
    AppComponent,
    BirthdayFormComponent,
    ServerInfoComponent,
    HoroscopeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,    
    NgIconsModule.withIcons({ simpleAngular, simpleTypescript, simpleJest, simpleNodedotjs }), 
        
  ],
  providers: [
    BirthdateInfoService,
    ZodiacService,
    NameService,
    BirthDateService,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
