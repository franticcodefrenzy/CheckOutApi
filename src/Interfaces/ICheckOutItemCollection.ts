'use strict'

import {ICheckOutItem} from './ICheckOutItem'

/**
 * @type used to record SKU => Qauntity / Price
 */
export type CheckOutItemNumber = Record<string, number>


/**
 * @interface ICheckOutItemCollection - abstracts collections of item shandy for mocking
 */
export interface ICheckOutItemCollection {

    addItem(item:ICheckOutItem):void

    getQuantity(sku:string):number

    getUnitPrice(sku:string):number|null

    calcPrice():number

    getTally():CheckOutItemNumber

}
