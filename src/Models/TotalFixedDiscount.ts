'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {Discount} from './Discount'
import {DiscountError} from '../Exceptions/DiscountError'

/**
 * @class TotalFixedDiscount - creates a discount of type "$40.00 off for total > $100.00"
 */
export class TotalFixedDiscount extends Discount implements IDiscount {

    public constructor(readonly total:number, protected discount:number){
        super()
    }

    public getDiscount(items:ICheckOutItemCollection):number {
        if (items.calcPrice() > this.total) {
            this.description = `Total Fixed Discount: ${this.discount}`
            return this.discount
        }
        return 0
    }

    public validate() {
        if (this.total < 1) {
            throw new DiscountError(DiscountError.InvalidTotalThreshold)
        }

        if (this.discount < 1) {
            throw new DiscountError(DiscountError.InvalidFixedDiscount)
        }
    }

}
