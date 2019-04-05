import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServiceProvider } from './../../providers/salesforce-service';
import { AppPreferences } from '@ionic-native/app-preferences';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  value: number;
  contacts: Array<{Name: string, Email: string, Phone: string, MailingStreet: string}> = [];

  constructor(public navCtrl: NavController, public service: ServiceProvider, public zone: NgZone,  public appPreferences: AppPreferences) {

    this.querySmartFromSoup().then(() => {
    }).catch((err) => {
      this.error(err);
    });
  }

  querySmartFromSoup(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getContactService().querySmartFromSoup("SELECT {Contact:_soup} FROM {Contact}", (response) => {
        response.currentPageOrderedEntries.map(value => {
          this.contacts.push(value[0]);
        });
        resolve();
      }, this.error)
    });
  }

  sync(): void  {

      this.service.getContactService().syncDown(this.handleProgress, this).then(() => {
        console.log("SyncDown contact");

          this.service.getContactService().syncUp(this.handleProgress, this).then(() => {

            console.log("SyncUp contact");

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
