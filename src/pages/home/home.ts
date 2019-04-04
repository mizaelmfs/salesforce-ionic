import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from './../../providers/salesforce-service';
import { AppPreferences } from '@ionic-native/app-preferences';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  value: number;
  contacts: Array<any>;

  constructor(public navCtrl: NavController, public service: ServiceProvider, public zone: NgZone,  public appPreferences: AppPreferences) {
    
  }

  querySoup(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getContactService().queryAllFromSoup("Id", "ascending", 1000, (response) => {
        this.contacts = response.currentPageOrderedEntries;
        resolve();
      }, this.error)
    });
  }

  querySmartFromSoup(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getContactService().querySmartFromSoup("SELECT {Contact:Id} FROM {Contact}", (response) => {
        this.contacts = response.currentPageOrderedEntries;
        console.log(response);
        resolve();
      }, this.error)
    });
  }

  sync(): void  {


      this.service.getContactService().syncDown(this.handleProgress, this).then(() => {
        this.value = 100;

          this.service.getContactService().syncUp(this.handleProgress, this).then(() => {

            this.setSuccessPreferences().then(() => {

              console.log("Tudo certo, nada errado!");

            }).catch((err) => {

              console.log("Preferences error");

            });
          }).catch((err) => {
            this.error(err);
          });
        }).catch((err) => {
          this.error(err);
        });
  }

  setSuccessPreferences(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.appPreferences.store('syncOk', "success").then((value) => {
        resolve();
      })
        .catch((err) => {
          reject(err);
        });
    });
  }

  error(err: string) {
    console.log(err);
  }

  handleProgress(progress: number) {
    console.log("CURRENT PROGRESS ----- ", progress);
    this.zone.run(() => {
      this.value = progress;
    });
  }
}
