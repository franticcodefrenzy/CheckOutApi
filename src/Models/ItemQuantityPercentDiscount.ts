'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {Discount} from './Discount'


export class ItemQuantityPercentDiscount extends Discount implements IDiscount {

    public constructor(protected sku:string, protected quantity:number, protected discount:number) {
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

}
