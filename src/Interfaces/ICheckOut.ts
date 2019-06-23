'use strict'

export interface ICheckOut {

    scan(CheckoutItem:any):void

    total():number

}
