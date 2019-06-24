'use strict'

import {ICheckOutItemCollection, CheckOutItemNumber} from '../Interfaces/ICheckOutItemCollection'
import {ICheckOutItem} from '../Interfaces/ICheckOutItem'
import {IErrorObserver} from '../Interfaces/IErrorObserver'


export class CheckOutItemCollection implements ICheckOutItemCollection {

    private cachedTotalPrice:number|null

    protected tally:CheckOutItemNumber
    protected unitPrices:CheckOutItemNumber
    protected items:ICheckOutItem[]


    public constructor(protected errorObserver:IErrorObserver = null) {
        this.tally = {}
        this.unitPrices = {}
        this.items = []
        this.cachedTotalPrice = null
    }


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

    
    public getQuantity(sku:string):number {
        const quantity = this.tally[sku]
        return (typeof quantity == "undefined") ? 0 : quantity
    }


    public getUnitPrice(sku:string):number|null {
        return (typeof this.unitPrices[sku] == "undefined") ? null : this.unitPrices[sku]
    }

    
    public calcPrice():number {
        if (this.cachedTotalPrice === null) {
            this.cachedTotalPrice = 0

            this.items.forEach((item:ICheckOutItem) => {
                this.cachedTotalPrice += item.getUnitPrice()
            })
        }

        return this.cachedTotalPrice
    }


    public getTally():CheckOutItemNumber {
        return this.tally
    }


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
