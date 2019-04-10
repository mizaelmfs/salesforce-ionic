import { AccountModel } from './../../model/AccountModel';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AppPreferences } from '@ionic-native/app-preferences';

/**
 * Serviço com os recursos de armazenamento local e sync do salesforce.
 */ 
@Injectable()
export class AccountService  {
    /**
     * Nome de nossa base de dados
     */
    storeName = "forceone";
    /**
     * classe model de nossa tabela
     */
    entity:AccountModel;
    /**
     * Configuração da base de dados
     */
    storeConfig = { storeName: this.storeName, isGlobalStore: true };
    /**
     * Query para sincronização entre nossa aplicação e o salesforce
     */
    targetSync = {
        type: "soql", query: "SELECT Id, Name, Description FROM Account"
    };

    constructor(platform: Platform, private appPreferences: AppPreferences) {

    }

    /**
     * Função com o objetivo de criverificar a exeitencia da "Tabela" 
     * 
     * @param sucess 
     * Callback de sucesso
     * @param error 
     * Callback de erro
     */
    soupExists(sucess: Function, error: Function) {
        if (window.hasOwnProperty('soupExists')) {
            window['soupExists'].call(null, this.storeConfig, AccountModel.soupName, function (soupExistsSucess) {
                console.log('soupExistsSucess', soupExistsSucess);
                sucess(soupExistsSucess);
            }, function (err) {
                error(err);
            });
        } else {
            error('propertie \'soupExists\' not found!');
        }
    }

    /**
     * Função com o objetivo de criar a "Tabela" 
     * 
     * @param sucess 
     * Callback de sucesso
     * @param error 
     * Callback de erro
     */
    registerSoup(sucess: Function, error: Function) {
        if (window.hasOwnProperty('registerSoup')) {
            window['registerSoup'].call(null, this.storeConfig, AccountModel.soupName, AccountModel.indexes, function (registerSoupSucess) {
                console.log('registerSoupSucess', registerSoupSucess);
                sucess();
            }, function (err) {
                error(err);
            });
        } else {
            error('propertie \'registerSoup\' not found!');
        }
    }

    /**
     * Função com o objetivo de retornar os recursos do salesforce para a nossa aplicação.
     * 
     * @param sucess 
     * Callback de sucesso
     * @param error 
     * Callback de erro
     */
    syncDown(handleProgress: Function, context: any): Promise<any> {
        var self = this;
        return new Promise((resolve, reject) => {

            var lastSyncDownId;

            AccountModel.getLastSyncDownId(self.appPreferences).then((response) => {
                lastSyncDownId = response;
                if (window.hasOwnProperty('syncDown')) {
                    window['syncDown'].call(null, this.storeConfig, this.targetSync, AccountModel.soupName, lastSyncDownId, handleProgress, context, function (syncDownSucess) {
                            console.log('syncDown finalizado com sucesso: Account', syncDownSucess);
                            AccountModel.setLastSyncDownId(self.appPreferences, syncDownSucess.lastSyncDownId).then((response) => {
                                resolve();
                        }).catch((error) => {
                            console.log('syncDown finalizado com erro: Account', error);
                            reject(error);
                        });
                    }, function (err) {
                        console.log(err);
                        reject(err);
                    });
                } else {
                    reject('propertie \'syncDown\' not found!');
                }

            }).catch((error) => {
                reject(error);
            });
        })
    }

    /**
     * Função com o objetivo de enviar os registros locais para o salesforce.
     * 
     * @param sucess 
     * Callback de sucesso
     * @param error 
     * Callback de erro
     */
    syncUp(handleProgress: Function, context: any) {
        var fieldlist = ["Id", "Name", "Account_Status__c", "Description", "Email__c", "Phone", "Type"];
        return new Promise((resolve, reject) => {
            if (window.hasOwnProperty('syncUp')) {
                window['syncUp'].call(null, this.storeConfig, AccountModel.soupName, fieldlist, handleProgress, context, function (syncUpSucess) {
                    console.log('syncUp finalizado com sucesso: Account', syncUpSucess);
                    resolve();
                }, function (err) {
                    console.log(err);
                    reject(err);
                });
            } else {
                reject('propertie \'syncUp\' not found!');
            }
        })
    }
    
    /**
     * Função com o objetivo de retornar as tabelas de nossa base local.
     * 
     * @param indexPath
     * index a ser aplicado o filtro de busca 
     * @param beginKey
     * valor inicial do filtro de busca 
     * @param endKey
     * valor final do filtro de busca 
     * @param direction
     * sentido da ordenação -- ascending, descending
     * @param pageSize
     * valor do numer de elementos da pagina
     * @param orderPath
     * @param sucess
     * Callback de sucesso 
     * @param error
     * Callback de erro 
     */
    queryRangeFromSoup(indexPath:string, beginKey:string, endKey:string, direction:string, pageSize:number, orderPath:string, sucess: Function, error: Function) {
        if (window.hasOwnProperty('queryRangeFromSoup')) {
            window['queryRangeFromSoup'].call(null, this.storeConfig, AccountModel.soupName, indexPath, beginKey, endKey, direction, pageSize, orderPath, sucess, error);
        } else {
            error('propertie \'queryRangeFromSoup\' not found!');
        }
    }

    /**
     * Função com o objetivo de retornar as tabelas de nossa base local.
     * 
     * @param indexPath
     * index a ser aplicado o filtro de busca 
     * @param likeKey
     * valor do termo no filtro de busca 
     * @param direction
     * sentido da ordenação -- ascending, descending
     * @param pageSize
     * valor do numer de elementos da pagina
     * @param orderPath
     * coluna de ordenação
     * @param sucess
     * Callback de sucesso 
     * @param error
     * Callback de erro 
     */
    queryLikeFromSoup(indexPath:string, likeKey:string, direction:string, pageSize:number, orderPath:string, sucess: Function, error: Function) {
        if (window.hasOwnProperty('queryLikeFromSoup')) {
            window['queryLikeFromSoup'].call(null, this.storeConfig, AccountModel.soupName, indexPath, likeKey, direction, pageSize, orderPath, sucess, error);
        } else {
            error('propertie \'queryLikeFromSoup\' not found!');
        }
    }

    /**
     * Função com o objetivo de retornar as tabelas de nossa base local.
     * 
     * @param orderPath
     * index a ser aplicado como ordenação
     * @param direction
     * sentido da ordenação -- ascending, descending
     * @param pageSize
     * valor do numer de elementos da pagina
     * @param sucess
     * Callback de sucesso 
     * @param error
     * Callback de erro 
     */
    queryAllFromSoup(orderPath:string, direction:string, pageSize:number, sucess: Function, error: Function) {
        if (window.hasOwnProperty('queryAllFromSoup')) {
            window['queryAllFromSoup'].call(null, this.storeConfig, AccountModel.soupName, orderPath, direction, pageSize, sucess, error);
        } else {
            error('propertie \'queryAllFromSoup\' not found!');
        }
    }

    /**
     * Função com o objetivo de retornar as tabelas de nossa base local.
     * 
     * @param indexPath
     * index a ser aplicado o filtro de busca 
     * @param matchKey
     * valor do filtro de busca 
     * @param pageSize
     * valor do numer de elementos da pagina
     * @param direction
     * sentido da ordenação -- ascending, descending
     * @param orderPath
     * coluna de ordenação
     * @param sucess
     * Callback de sucesso 
     * @param error
     * Callback de erro 
     */
    queryExactFromSoup(indexPath:string, matchKey:string, pageSize:number, direction:string, orderPath:string, sucess: Function, error: Function) {
        if (window.hasOwnProperty('queryExactFromSoup')) {
            window['queryExactFromSoup'].call(null, this.storeConfig, AccountModel.soupName, indexPath, matchKey, pageSize, direction, orderPath, sucess, error);
        } else {
            error('propertie \'queryExactFromSoup\' not found!');
        }
    }

    /**
     * Função com o objetivo de retornar as tabelas de nossa base local.
     * 
     * @param smartSql
     * query sql a ser executada
     * @param sucess
     * Callback de sucesso 
     * @param error
     * Callback de erro 
     */
    querySmartFromSoup(smartSql:string, sucess: Function, error: Function) {
        if (window.hasOwnProperty('querySmartFromSoup')) {
            window['querySmartFromSoup'].call(null, this.storeConfig, smartSql, sucess, error);
        } else {
            error('propertie \'querySmartFromSoup\' not found!');
        }
    }

    moveCursorToNextPage(cursor:any, sucess: Function, error: Function) {
        if (window.hasOwnProperty('moveCursorToPageIndex')) {
            window['moveCursorToNextPage'].call(null, this.storeConfig, cursor, sucess, error);
        } else {
            error('propertie \'moveCursorToNextPage\' not found!');
        }
    }

    moveCursorToPreviousPage(cursor:any, sucess: Function, error: Function) {
        if (window.hasOwnProperty('moveCursorToPreviousPage')) {
            window['moveCursorToPreviousPage'].call(null, this.storeConfig, cursor, sucess, error);
        } else {
            error('propertie \'moveCursorToPreviousPage\' not found!');
        }
    }

    /**
     * Função que possui o objetivo de Alterar/Inserir registros em nossa base local.
     * 
     * @param entries 
     * Valores no qual iremos inserir/alterar na base local
     * @param sucess
     * Callback de sucesso
     * @param error 
     * Callback de erro
     */
    upsertSoupEntries(entries: Array<any>, sucess: Function, error: Function) {
        if (window.hasOwnProperty('upsertSoupEntries')) {
            window['upsertSoupEntries'].call(null, this.storeConfig, AccountModel.soupName, entries, sucess, error);
        } else {
            error('propertie \'upsertSoupEntries\' not found!');
        }
    }

    /**
     * Função com o objetivo de retornar os registros de nossa base local.
     * 
     * @param inputStr 
     * Conjunto de ids que iremos utilizar para buscar os registros
     * @param sucess 
     * Callback de sucesso
     * @param error 
     * Callback de erro
     */
    retrieveEntries(inputStr: string, sucess: Function, error: Function) {
        let ids = [inputStr];
        if (window.hasOwnProperty('retrieveEntries')) {
            window['retrieveEntries'].call(null, this.storeConfig, AccountModel.soupName, ids, sucess, error);
        } else {
            error('propertie \'retrieveEntries\' not found!');
        }
    }

    /**
     * Função com o objetivo de remover os registros de nossa base local
     * 
     * @param inputStr 
     * Conjunto de ids que iremos utilizar para buscar os registros
     * @param sucess 
     * Callback de sucesso
     * @param error
     * Callback de erro 
     */
    removeEntries(inputStr: string, sucess: Function, error: Function) {
        let ids = [inputStr];
        if (window.hasOwnProperty('removeEntries')) {
            window['removeEntries'].call(null, this.storeConfig, AccountModel.soupName, ids, sucess, error);
        } else {
            error('propertie \'removeEntries\' not found!');
        }
    }

    /**
     * Função com o objetivo de retornar a base para a criação de um novo registro.
     * 
     */
    createEntrie(): any {
        return new AccountModel(null);
    }
}