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

        const totalPrice = items.calcPrice()
        const tally = items.getTally()

        // Strip out all disounts based on a total, where that total is > total Price - as they wont apply
        let filteredDiscounts = this.discounts.filter((offer:any) => typeof offer.total == "undefined" || offer.total < totalPrice)
        // Strip out all discounts where there is not enough of the type of SKU they need
                                              .filter((offer:any) => typeof offer.sku == "undefined" || offer.quantity <= tally[offer.sku] )

        filteredDiscounts.forEach((offer:IDiscount) => {
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

    /*
    protected filterOutDiscounts():void {
        let filteredDiscounts:IDiscount[] = []

        this.discounts.forEach((offer:IDiscount) => {

        })

        this.discounts = filteredDiscounts
    }*/

}
