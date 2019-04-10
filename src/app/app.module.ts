import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/salesforce-service';
import { AutenticateService } from './../providers/autenticate/autenticate-service-salesforce';
import { ContactService } from './../providers/contact/contact-service-salesforce';
import { AppPreferences } from '@ionic-native/app-preferences';
import { AccountService } from '../providers/account/account-service-salesforce';
import { AccountPage } from '../pages/account/account';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    AccountPage
  ],
  imports: [
BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    AccountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServiceProvider,
    AutenticateService,
    ContactService,
    AppPreferences,
    AccountService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
