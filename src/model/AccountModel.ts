import { AppPreferences } from '@ionic-native/app-preferences';


/**
 * Classe model da entidade Account 
 */ 

export class AccountModel  {

    /**
     * Nome de nossa tabela
     */ 
    static soupName = "Account";
    
    /**
     * Colunas de nossa tabela seguidamente de seu tipo.
     */
    static indexes = [
        { path: "Id", type: "string" },{ path: "Name", type: "string" },{ path: "Description", type: "string" },{ path: "__local__", type: "string" },
    ];
    /**
     * Identificação tipo do registro no banco de dados local
     */
    attributes = { type: "Account" };
	/**
	* Atributo da entidade no saleforce.
    
	*/
    Id:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    Name:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    BillingAddress:string;
	/**
	* Atributo da entidade no saleforce.
    
	*/
    Description:string;
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
            appPreferences.fetch('lastSyncDownIdAccount').then((res) => { 
                console.log('getLastSyncDownId lastSyncDownIdAccount', res);
                resolve(res);
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    static setLastSyncDownId(appPreferences:AppPreferences, lastSyncDownId:string): Promise<any> {
        return new Promise((resolve, reject) => {
            appPreferences.store('lastSyncDownIdAccount', lastSyncDownId).then((res) => { 
                console.log('setLastSyncDownId lastSyncDownIdAccount', res);
                resolve(res);
            }).catch((error)=>{
                reject(error);
            });
        });
    }

    validate():Promise<any>{
        let invalidFields = [];
        return new Promise((resolve, reject) => {
            
            if(invalidFields.length === 0){
                resolve();
            }else{
                reject(invalidFields);
            }

        });
    }
}