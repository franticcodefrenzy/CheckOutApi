'use strict'

import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection';
import {CheckOutItemTally} from './CheckOutItemTally'
import {ICheckOutItem} from '../Interfaces/ICheckOutItem';


export class CheckOutItemCollection implements ICheckOutItemCollection {

    protected tally:CheckOutItemTally
    protected items:ICheckOutItem[]


    public constructor() {
        this.tally = {}
        this.items = []
    }


    public addItem(item:ICheckOutItem):void {
        this.items.push(item)

        const sku = item.getSku()
        if (typeof this.tally[sku] == "undefined") {
            this.tally[sku] = 1
        }
        else {
            this.tally[sku]++
        }
    }

    
    public getQuantity(sku:string):number {
        const quantity = this.tally[sku]
        return (typeof quantity == "undefined") ? 0 : quantity
    }

    
    public calcPrice():number {
        let price = 0

        this.items.forEach(function(item:ICheckOutItem){
            price += item.getUnitPrice()
        })

        return price
    }

}
