import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutongModule } from './app-routing.module';

import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HeroesModule } from './heroes/heroes.module';



@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutongModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
