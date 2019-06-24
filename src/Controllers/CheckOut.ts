'use strict'

import {ICheckOut} from '../Interfaces/ICheckOut'
import {ICheckOutItem} from '../Interfaces/ICheckOutItem'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {IDiscountCollection} from '../Interfaces/IDiscountCollection'
import {IErrorObserver} from '../Interfaces/IErrorObserver'
import {CheckOutItemCollection} from '../Collections/CheckOutItemCollection'


export class CheckOut implements ICheckOut {

    protected items:ICheckOutItemCollection
    protected discounts:IDiscountCollection


    public constructor(discounts:IDiscountCollection = null, protected errorObserver:IErrorObserver = null) {
        this.items = new CheckOutItemCollection(errorObserver)
        this.discounts = discounts
    }


    public scan(item:ICheckOutItem):void {
        this.items.addItem(item)
    }

    
    public total():number {
        const basePrice   = this.items.calcPrice()
        let totalDiscount = 0

        if (this.discounts) {
            totalDiscount = this.discounts.applyDiscounts(this.items)
        }

        return basePrice - totalDiscount
    }


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

