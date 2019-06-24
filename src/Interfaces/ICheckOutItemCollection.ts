'use strict'

import {ICheckOutItem} from './ICheckOutItem'


export interface ICheckOutItemCollection {

    addItem(item:ICheckOutItem):void

    getQuantity(sku:string):number

    calcPrice():number

}
