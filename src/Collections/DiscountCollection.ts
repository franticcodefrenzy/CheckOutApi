'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'
import {IDiscountCollection} from '../Interfaces/IDiscountCollection'
import {IErrorObserver} from '../Interfaces/IErrorObserver'

/**
 * @class DiscountCollection - collection all price rules - discounts
 */
export class DiscountCollection implements IDiscountCollection {

    // Discuotns held in a simple array
    protected discounts:IDiscount[]
    // Descriptions of discounts applied are captured
    protected discountsApplied:string[]
    // Total discount of all applied
    protected totalDiscount:number

    /**
     * Takes optional error observer
     * @param errorObserver 
     */
    public constructor(protected errorObserver:IErrorObserver = null) {
        this.discounts = []
        this.reset()
    }

    /**
     * Validates and adds a discount if ok
     * @param discount 
     */
    public addDiscount(discount:IDiscount):void {
        try {
            discount.validate()
            this.discounts.push(discount)
        }
        catch (error) {
            if (this.errorObserver) {
                this.errorObserver.handleError(error)
            }
            else {
                throw error
            }
        }
    }

    /**
     * Determines how many discounts apply to the collection of checkout items passed
     * 
     * Performs some pre-filtering to reduce the discount dataset, in the event there are thousands
     * 
     * @param items 
     */
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

}
