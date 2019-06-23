'use strict'

import {ICheckOutItem} from '../Interfaces/ICheckOutItem'


export class CheckOutItem implements ICheckOutItem {

    protected SKU:string
    protected UnitPrice:number


    public constructor(sku:string, unitPrice:number) {
        this.SKU = sku
        this.UnitPrice = unitPrice
    }

    public getSku():string {
        return this.SKU
    }

    public getUnitPrice():number {
        return this.UnitPrice
    }

}
