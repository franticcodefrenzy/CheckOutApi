'use strict'

/**
 * @interface ICheckOut - abstacts key interface for main CheckOut controller
 */
export interface ICheckOut {

    scan(CheckoutItem:any):void

    total():number

}
