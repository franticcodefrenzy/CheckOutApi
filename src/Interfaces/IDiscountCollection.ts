'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'


export interface IDiscountCollection {

    addDiscount(discount:IDiscount):void

    applyDiscounts(items:ICheckOutItemCollection):number

    getDiscountDescriptions():string[]

    hasOffers():boolean

}
