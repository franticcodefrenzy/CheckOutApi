'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'

/**
 * @class Discount - forms base for discounts, implementing the getOfferDescription()
 * which doesnt need to be different for each IDiscount implementation
 */
export abstract class Discount implements IDiscount {

    protected description:string = null
    

    public getOfferDescripton():string {
        return this.description
    }
    
    // Needs to be implemented by subclasses
    public abstract getDiscount(items:ICheckOutItemCollection):number
    public abstract validate():void

}
