'use strict'

import {ICheckOutItem} from '../Interfaces/ICheckOutItem'
import {CheckOutItemError} from '../Exceptions/CheckOutItemError'


export class CheckOutItem implements ICheckOutItem {

    public constructor(protected sku:string, protected unitPrice:number) {
    }

    public getSku():string {
        return this.sku
    }

    public getUnitPrice():number {
        return this.unitPrice
    }

    public validate() {
        if (this.sku == null || this.sku.trim().length == 0) {
            throw new CheckOutItemError(CheckOutItemError.InvalidSku)
        }

        if (this.unitPrice < 1) {
            throw new CheckOutItemError(CheckOutItemError.InvalidUnitPrice)
        }
    }

}
