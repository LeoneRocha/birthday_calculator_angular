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
@NgModule({
  declarations: [
    AppComponent,
    BirthdayFormComponent,
    ServerInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,    
    NgIconsModule.withIcons({ simpleAngular, simpleTypescript, simpleJest, simpleNodedotjs })

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
