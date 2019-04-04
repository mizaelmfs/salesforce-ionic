import { Injectable } from '@angular/core';

@Injectable()
export class AutenticateService {

    constructor() { }

    logoutSf() {
        if (window.hasOwnProperty('logout')) {
              window['logout'].call();
        }else{
            console.log("propertie 'logout' not found!");
        }
      }

      getCurrentUser():Promise<any>{
        return new Promise((resolve, reject) => {
            if (window.hasOwnProperty('getCurrentUser')) {
                window['getCurrentUser'].call(null, resolve, reject);
            }else{
                reject("propertie 'getCurrentUser' not found!");
            }
        });
      }
}