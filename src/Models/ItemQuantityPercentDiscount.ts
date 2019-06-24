'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {Discount} from './Discount'
import {DiscountError} from '../Exceptions/DiscountError'


export class ItemQuantityPercentDiscount extends Discount implements IDiscount {

    public constructor(readonly sku:string, readonly quantity:number, protected discount:number) {
        super()
    }

    public getDiscount(items:ICheckOutItemCollection):number {
        if (items.getQuantity(this.sku) >= this.quantity) {
            const unitPrice = items.getUnitPrice(this.sku)

            if (unitPrice !== null) {
                const amountOf   = (unitPrice * this.quantity) * this.discount
                this.description = `Total Percent Discount: ${amountOf}`
                return amountOf
            }
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

        if (this.discount <= 0 || this.discount >= 1) {
            throw new DiscountError(DiscountError.InvalidPercentDiscount)
        }
    }

}
