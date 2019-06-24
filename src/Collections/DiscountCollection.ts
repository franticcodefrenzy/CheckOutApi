'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {IDiscountCollection} from '../Interfaces/IDiscountCollection'


export class DiscountCollection implements IDiscountCollection {

    protected discounts:IDiscount[]
    protected discountsApplied:string[]
    protected totalDiscount:number


    public constructor() {
        this.discounts = []
        this.reset()
    }


    public addDiscount(discount:IDiscount):void {
        this.discounts.push(discount)
    }


    public applyDiscounts(items:ICheckOutItemCollection):number {
        this.reset()

        this.discounts.forEach((offer:IDiscount) => {
            const discount = offer.getDiscount(items)

            if (discount > 0) {
                this.totalDiscount += discount
                this.discountsApplied.push(offer.getOfferDescripton())
            }
        })

        return this.totalDiscount
    }


    public getDiscountDescriptions():string[] {
        return this.discountsApplied
    }


    public hasOffers():boolean {
        return this.discounts.length > 0
    }


    protected reset() {
        this.discountsApplied = []
        this.totalDiscount = 0
    }

}
