import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { API_BASE_URL } from "./api/base-api-service";
import {environment} from "../environments/environment";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {NgbActiveModal, NgbModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModalModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'NgRx RecruiterLite',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    NgbModule,
  ],
  providers: [
    {provide: API_BASE_URL, useValue: environment.apiBaseUrl},
    NgbActiveModal,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
