'use strict'


export interface IPriceRule {

    getDiscount(totalPrice:number, tally:any):number

}
