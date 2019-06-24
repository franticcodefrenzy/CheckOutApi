'use strict'

import {ICheckOut} from '../Interfaces/ICheckOut'
import {ICheckOutItem} from '../Interfaces/ICheckOutItem'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {CheckOutItemCollection} from './CheckOutItemCollection'


export class CheckOut implements ICheckOut {

    protected items:ICheckOutItemCollection


    public constructor() {
        this.items = new CheckOutItemCollection()
    }


    public scan(item:ICheckOutItem):void {
        this.items.addItem(item)
    }

    
    public total():number {
        return this.items.calcPrice()
    }

}

