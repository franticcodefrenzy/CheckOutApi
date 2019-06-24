'use strict'

import {ICheckOutItemCollection} from '../src/Interfaces/ICheckOutItemCollection'
import {ICheckOutItem} from '../src/Interfaces/ICheckOutItem'


export class MockCheckOutItemCollection implements ICheckOutItemCollection {

    public constructor(protected quantity:number, protected unitPrice:number, protected totalPrice:number) {
    }

    public addItem(item:ICheckOutItem):void {
    }

    public getQuantity(sku:string):number {
        return this.quantity
    }

    public getUnitPrice(sku:string):number|null {
        return this.unitPrice
    }

    public calcPrice():number {
        return this.totalPrice
    }

}

