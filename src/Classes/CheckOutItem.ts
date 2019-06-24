'use strict'

import {ICheckOutItem} from '../Interfaces/ICheckOutItem'


export class CheckOutItem implements ICheckOutItem {

    protected sku:string
    protected unitPrice:number


    public constructor(sku:string, unitPrice:number) {
        this.sku = sku
        this.unitPrice = unitPrice
    }

    public getSku():string {
        return this.sku
    }

    public getUnitPrice():number {
        return this.unitPrice
    }

}
