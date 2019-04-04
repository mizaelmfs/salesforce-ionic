import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AppPreferences } from '@ionic-native/app-preferences';
import { ServiceProvider } from './../providers/salesforce-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public appPreferences: AppPreferences,
    public service: ServiceProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.service.getAutenticateService().getCurrentUser().then((oauthData) => {
        console.log('sucesso login', oauthData);
        this.appPreferences.store("user_id", oauthData.userId);

        var properties = Object.getOwnPropertyNames(this.service);
        for (var entityService in properties) {
          var currentService = Reflect.get(this.service, properties[entityService]);
          this.validateSoupStatus(currentService).then((res) => {
            console.log('validateSoupStatus ' + res.has, res.service);
            if (!res.has) {
              this.createSoup(res.service).then((res2) => {
                console.log('createSoup ', res2);
                this.verifySyncState();
              }).catch((err2) => {
                console.log('createSoup erro', err2);
              });
            } else {
              this.verifySyncState();
            }
          }).catch((err) => {
            this.createSoup(err).then((res3) => {
              console.log('createSoup ', res3);
            }).catch((err3) => {
              console.log('createSoup erro', err3);
            });
          });
        }

        

      }).catch((err) => {
        console.log('erro login: ', err);
      });

    });
  }

  validateSoupStatus(currentService: any): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('validateSoupStatus from ', currentService);
      var promiseResponse = {
        has: true,
        service: currentService
      };
      if (Reflect.has(currentService, 'soupExists')) {
        currentService.soupExists((response) => {
          if (response) {
            resolve(promiseResponse);
          } else {
            reject(currentService);
          }
        }, (response) => {
          reject(currentService);
        });
      } else {
        resolve(promiseResponse);
      }
    });
  }

  createSoup(soupService): Promise<any> {
    return new Promise((resolve, reject) => {
      soupService.registerSoup(() => {
        this.validateSoupStatus(soupService).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      }, (err) => {
        console.log(err);
        reject(err)
      })
    });
  }

  error(err: string) {
    console.log(err);
  }

  verifySyncState() {
    this.appPreferences.fetch('syncOk').then((value) => {
      this.rootPage = HomePage;
    }).catch((err) => {
      console.log(err);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
