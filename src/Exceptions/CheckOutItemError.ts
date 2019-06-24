'use strict'

/**
 * @class CheckOutItemError - errors for CheckOutItems
 */
export class CheckOutItemError extends Error {

    public static readonly InvalidSku = "The SKU Is Not Valid"
    public static readonly InvalidUnitPrice = "The Unit Price is Not Valid"

    public constructor(message:string) {
        super("CheckOutItemError: " + message)
    }

}
