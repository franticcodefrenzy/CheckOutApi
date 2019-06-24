'use strict'

import {ICheckOutItemCollection, CheckOutItemNumber} from '../Interfaces/ICheckOutItemCollection'
import {ICheckOutItem} from '../Interfaces/ICheckOutItem'
import {IErrorObserver} from '../Interfaces/IErrorObserver'

/**
 * @class CheckOutItemCollection - is an implementation to hold an array of checkout items
 */
export class CheckOutItemCollection implements ICheckOutItemCollection {

    // We cache the price to avoid repeated calcs. This is private as no subclass needs to be aware of this
    private cachedTotalPrice:number|null

    // A structure to store the quantity of each item SKU, to speed up lookups for discounts
    protected tally:CheckOutItemNumber
    // A structure to store the prices for each item, for quick reference for discounts
    protected unitPrices:CheckOutItemNumber
    // Items are stored in a simple array
    protected items:ICheckOutItem[]

    /**
     * Takes an optional error observer
     * @param errorObserver 
     */
    public constructor(protected errorObserver:IErrorObserver = null) {
        this.tally = {}
        this.unitPrices = {}
        this.items = []
        this.cachedTotalPrice = null
    }

    /**
     * Validates an item, then adds it if ok
     * @param item 
     */
    public addItem(item:ICheckOutItem):void {
        try {
            item.validate()
            this.includeItem(item)
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
     * For discounts to get quantityi of SKU held
     * @param sku 
     */
    public getQuantity(sku:string):number {
        const quantity = this.tally[sku]
        return (typeof quantity == "undefined") ? 0 : quantity
    }

    /**
     * For discounts to get unit prices for percent based discounts
     * @param sku 
     */
    public getUnitPrice(sku:string):number|null {
        return (typeof this.unitPrices[sku] == "undefined") ? null : this.unitPrices[sku]
    }

    /**
     * Calculates the prices just on items held, with no knowledge of discounts
     */
    public calcPrice():number {
        if (this.cachedTotalPrice === null) {
            this.cachedTotalPrice = 0

            this.items.forEach((item:ICheckOutItem) => {
                this.cachedTotalPrice += item.getUnitPrice()
            })
        }

        return this.cachedTotalPrice
    }

    /**
     * Performance improvement to make filtering discounts easier
     */
    public getTally():CheckOutItemNumber {
        return this.tally
    }

    /**
     * Adds an item and records tally anf unit prices for performance
     * @param item 
     */
    protected includeItem(item:ICheckOutItem):void {
        this.items.push(item)

        const sku = item.getSku()

        if (typeof this.tally[sku] == "undefined") {
            this.tally[sku]      = 1
            this.unitPrices[sku] = item.getUnitPrice() 
        }
        else {
            this.tally[sku]++
        }
    }

}
