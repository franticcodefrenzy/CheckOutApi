'use strict'

/**
 * @interface ICheckOutItem - key interface for all checkout items.
 * Allows these objects to be passed around without needing to know of any specific variations
 */
export interface ICheckOutItem {

    getSku():string

    getUnitPrice():number

    validate():void

}
