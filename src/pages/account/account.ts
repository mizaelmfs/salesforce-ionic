import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/salesforce-service';
import { AppPreferences } from '@ionic-native/app-preferences';
import { ContactPage } from './../contact/contact';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  value: number;
  accounts: Array<{ Name: string, Description: string, Id: string }> = [];

  constructor(public navCtrl: NavController, 
    public service: ServiceProvider, 
    public zone: NgZone, 
    public appPreferences: AppPreferences) {

    this.querySmartFromSoup().then(() => {
    }).catch((err) => {
      this.error(err);
    });
  }

  querySmartFromSoup(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.getAccountService().querySmartFromSoup("SELECT {Account:_soup} FROM {Account}", (response) => {
        response.currentPageOrderedEntries.map(value => {
          this.accounts.push(value[0]);
        });
        resolve();
      }, this.error)
    });
  }

  sync(): void {
    this.service.getAccountService().syncDown(this.handleProgress, this).then(() => {
      console.log("SyncDown account");

      this.service.getContactService().syncDown(this.handleProgress, this).then(() => {
        console.log("SyncDown contact");

        this.service.getAccountService().syncUp(this.handleProgress, this).then(() => {

          console.log("SyncUp account");

          this.service.getContactService().syncUp(this.handleProgress, this).then(() => {

            console.log("SyncUp contact");

            this.setSuccessPreferences().then(() => {

              console.log("Tudo certo, nada errado!");

            }).catch((err) => {

              console.log("Preferences error");

            });
          }).catch((err) => {
            this.error(err);
          }).catch((err) => {
            this.error(err);
          });
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

  public goToAccount(account: any): void {
    this.navCtrl.push(ContactPage, account);
  }
}

