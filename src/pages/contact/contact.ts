import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/salesforce-service';
import { AppPreferences } from '@ionic-native/app-preferences';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  value: number;
  contacts: Array<{ Name: string, Email: string, Phone: string, MailingStreet: string }> = [];
  accountId: string;

  constructor(public navCtrl: NavController, 
    public service: ServiceProvider, 
    public zone: NgZone, 
    public appPreferences: AppPreferences,
    public navParams: NavParams) {
    
    this.accountId = navParams.get('Id');

    this.querySmartFromSoup().then(() => {
    }).catch((err) => {
      this.error(err);
    });
  }

  querySmartFromSoup(): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = `SELECT {Contact:_soup} FROM {Contact} where {Contact:AccountId} = '${this.accountId}'`;
      console.log(query)
      this.service.getContactService().querySmartFromSoup(query, (response) => {
        response.currentPageOrderedEntries.map(value => {
          this.contacts.push(value[0]);
        });
        resolve();
      }, this.error)
    });
  }

  error(err: string) {
    console.log(err);
  }
}
