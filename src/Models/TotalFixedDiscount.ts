'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {Discount} from './Discount'


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

}
