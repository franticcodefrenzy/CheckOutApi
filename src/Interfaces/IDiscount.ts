'use strict'

import {ICheckOutItemCollection} from '../Interfaces/ICheckOutItemCollection'


export interface IDiscount {

    getDiscount(items:ICheckOutItemCollection):number

    getOfferDescripton():string

}
