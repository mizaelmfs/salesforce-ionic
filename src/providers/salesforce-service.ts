import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ContactService } from "./contact/contact-service-salesforce";
import { AutenticateService } from "./autenticate/autenticate-service-salesforce";
import { AccountService } from './account/account-service-salesforce';


/**
 * Serviço com os recursos de armazenamento local e sync do salesforce.
 */ 
@Injectable()
export class ServiceProvider  {
    
    constructor(platform: Platform, 
        public contactService: ContactService, 
        public autenticateService: AutenticateService,
        public accountService: AccountService) {

    }

    /**
     * provider dos serviÃ§os da entidade Account
     */
    getAccountService(){
        return this.accountService;
    }

    /**
     * provider dos serviÃ§os da entidade Contact
     */
    getContactService(){
        return this.contactService;
    }

    /**
     * provider dos serviÃ§os da entidade Autenticate
     */
    getAutenticateService(){
        return this.autenticateService;
    }
    
}