'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {Discount} from './Discount'
import {DiscountError} from '../Exceptions/DiscountError'


export class ItemQuantityFixedDiscount extends Discount implements IDiscount {

    public constructor(readonly sku:string, readonly quantity:number, protected discount:number) {
        super()
    }

    
    public getDiscount(items:ICheckOutItemCollection):number {
        if (items.getQuantity(this.sku) >= this.quantity) {
            this.description = `Total Fixed Discount: ${this.discount}`
            return this.discount
        }
        return 0
    }

    public validate() {
        if (this.sku == null || this.sku.trim().length == 0) {
            throw new DiscountError(DiscountError.InvalidSku)
        }

        if (this.quantity < 1) {
            throw new DiscountError(DiscountError.InvalidQuantity)
        }

        if (this.discount < 1) {
            throw new DiscountError(DiscountError.InvalidFixedDiscount)
        }
    }

}
