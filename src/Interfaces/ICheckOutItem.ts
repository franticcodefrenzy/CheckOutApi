'use strict'


export interface ICheckOutItem {

    getSku():string

    getUnitPrice():number

    validate():void

}
