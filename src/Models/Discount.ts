'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'


export abstract class Discount implements IDiscount {

    protected description:string = null
    

    public abstract getDiscount(items:ICheckOutItemCollection):number


    public getOfferDescripton():string {
        return this.description
    }

}
