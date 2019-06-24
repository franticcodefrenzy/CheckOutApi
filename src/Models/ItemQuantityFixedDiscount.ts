'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {Discount} from './Discount'


export class ItemQuantityFixedDiscount extends Discount implements IDiscount {

    public constructor(protected sku:string, protected quantity:number, protected discount:number) {
        super()
    }

    public getDiscount(items:ICheckOutItemCollection):number {
        if (items.getQuantity(this.sku) >= this.quantity) {
            this.description = `Total Fixed Discount: ${this.discount}`
            return this.discount
        }
        return 0
    }

}
