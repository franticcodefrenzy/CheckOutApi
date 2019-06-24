'use strict'

/**
 * @class DiscountError - errors for Discounts
 */
export class DiscountError extends Error {

    public static readonly InvalidSku = "The SKU Is Not Valid"
    public static readonly InvalidQuantity = "The Quantity of SKU Is Not Valid"
    public static readonly InvalidTotalThreshold = "The Total Price Threshold is Not Valid"
    public static readonly InvalidFixedDiscount = "The Fixed Discount Is Not Valid"
    public static readonly InvalidPercentDiscount = "The Percent Discount Is Not Valid"

    public constructor(message:string) {
        super("DiscountError: " + message)
    }

}

