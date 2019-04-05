import { AppPreferences } from '@ionic-native/app-preferences';


/**
 * Classe model da entidade Contact 
 */ 

export class ContactModel  {

    /**
     * Nome de nossa tabela
     */ 
    static soupName = "Contact";
    
    /**
     * Colunas de nossa tabela seguidamente de seu tipo.
     */
    static indexes = [
        { path: "Id", type: "string" },{ path: "AccountId", type: "string" },{ path: "Description", type: "string" },{ path: "Email", type: "string" },{ path: "MailingAddress", type: "string" },{ path: "MailingStreet", type: "string" },{ path: "MailingCity", type: "string" },{ path: "MailingState", type: "string" },{ path: "MailingPostalCode", type: "string" },{ path: "Name", type: "string" },{ path: "FirstName", type: "string" },{ path: "LastName", type: "string" },{ path: "Phone", type: "string" },{ path: "__local__", type: "string" },
    ];
    /**
     * Identificação tipo do registro no banco de dados local
     */
    attributes = { type: "Contact" };
	/**
	* Atributo da entidade no saleforce.
    
	*/
    Id:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    AccountId:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    Description:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    Email:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    MailingAddress:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    MailingStreet:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    MailingCity:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    MailingState:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    MailingPostalCode:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    Name:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    FirstName:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    LastName:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    Phone:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    Office__c:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    __local__:boolean;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    __locally_created__:boolean;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    __locally_updated__:boolean;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    __locally_deleted__:boolean;

    constructor(object: Object) {
        if (object) {
            for (const key of Object.keys(object)) {
                this[key] = object[key];
            }
        } else {
            this.Id = "local_" + (new Date()).getTime();
            this.__locally_created__ = true;
            this.__locally_updated__ = true;
            this.__locally_deleted__ = false;
            this.__local__ = true;
        }
    }

    static getLastSyncDownId(appPreferences:AppPreferences,): Promise<any> {
        return new Promise((resolve, reject) => {
            appPreferences.fetch('lastSyncDownIdContact').then((res) => { 
                console.log('getLastSyncDownId lastSyncDownIdContact', res);
                resolve(res);
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    static setLastSyncDownId(appPreferences:AppPreferences, lastSyncDownId:string): Promise<any> {
        return new Promise((resolve, reject) => {
            appPreferences.store('lastSyncDownIdContact', lastSyncDownId).then((res) => { 
                console.log('setLastSyncDownId lastSyncDownIdContact', res);
                resolve(res);
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    validate():Promise<any>{
        let invalidFields = [];
        return new Promise((resolve, reject) => {
            
            if(this.AccountId === null || this.AccountId === undefined || this.AccountId === ''){
                invalidFields.push({"Field":'AccountId', "Reason": "This field can't be empty"});
            }
            
            if(invalidFields.length === 0){
                resolve();
            }else{
                reject(invalidFields);
            }

        });
    }
}