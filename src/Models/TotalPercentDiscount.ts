'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {Discount} from './Discount'


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

}
