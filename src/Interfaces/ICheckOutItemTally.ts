'use strict'

import {ICheckOutItem} from './ICheckOutItem'


export type CheckOutItemTally = Record<string, number>


export interface ICheckOutItemTally {

    addItem(item:ICheckOutItem):void

    getQuantity(sku:string):number

}
