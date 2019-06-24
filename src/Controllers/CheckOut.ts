'use strict'

import {ICheckOut} from '../Interfaces/ICheckOut'
import {ICheckOutItem} from '../Interfaces/ICheckOutItem'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {IDiscountCollection} from '../Interfaces/IDiscountCollection'
import {IErrorObserver} from '../Interfaces/IErrorObserver'
import {CheckOutItemCollection} from '../Collections/CheckOutItemCollection'

/**
 * @class CheckOut is the main interface (Controller) to the whole checkout process
 */
export class CheckOut implements ICheckOut {

    // CheckOut & Discount items are stored by these members, which can be swapped out for a different implementation matching the interfaces
    protected items:ICheckOutItemCollection
    protected discounts:IDiscountCollection

    /**
     * Both discount collection and an observer are optional
     * @param discounts 
     * @param errorObserver 
     */
    public constructor(discounts:IDiscountCollection = null, protected errorObserver:IErrorObserver = null) {
        this.items = new CheckOutItemCollection(errorObserver)
        this.discounts = discounts
    }

    /**
     * Scans and Items - the work being done by the underlying collection
     * @param item 
     */
    public scan(item:ICheckOutItem):void {
        this.items.addItem(item)
    }

    /**
     * Performs the full calculation of item value and applies discounts
     * @return number
     */
    public total():number {
        const basePrice   = this.items.calcPrice()
        let totalDiscount = 0

        if (this.discounts) {
            totalDiscount = this.discounts.applyDiscounts(this.items)
        }

        return basePrice - totalDiscount
    }

    /**
     * Debug function to show what discounts were applied to the CheckOut process
     */
    public outputDiscountsApplied():void {
        if (this.discounts && this.discounts.hasOffers()) {
            const descriptions = this.discounts.getDiscountDescriptions()

            if (descriptions.length > 0) {
                descriptions.forEach((offer:string) => {
                    console.log("**Offer applied: ", offer)
                })
            }
            else {
                console.log("(No offers applied)")
            }
        }
        else {
            console.log("(No offers loaded)")
        }
    }

}

