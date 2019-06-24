'use strict'

import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'

/**
 * @interface IDiscount - key componenets shared by all discounts (Price Rules)
 * Allows operating on discount variations without having to be aware of their implementations
 */
export interface IDiscount {

    getDiscount(items:ICheckOutItemCollection):number

    getOfferDescripton():string

    validate():void

}
