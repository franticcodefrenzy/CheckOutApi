'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {Discount} from './Discount'
import {DiscountError} from '../Exceptions/DiscountError'


export class TotalPercentDiscount extends Discount implements IDiscount {

    public constructor(readonly total:number, protected discount:number){
        super()
    }

    public getDiscount(items:ICheckOutItemCollection):number {
        const totalPrice = items.calcPrice()
        
        if (totalPrice > this.total) {
            const amountOf   = totalPrice * this.discount
            this.description = `Total Percent Discount: ${amountOf}`
            return amountOf
        }
        return 0
    }

    public validate() {
        if (this.total < 1) {
            throw new DiscountError(DiscountError.InvalidTotalThreshold)
        }

        if (this.discount <= 0 || this.discount >= 1) {
            throw new DiscountError(DiscountError.InvalidPercentDiscount)
        }
    }

}
