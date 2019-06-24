'use strict'

import {ICheckOutItem} from '../Interfaces/ICheckOutItem'
import {CheckOutItem} from '../Models/CheckOutItem'

/**
 * @class CheckOutItemFactory - helper to create preset CheckOutItems
 */
export class CheckOutItemFactory {

    public static newA():ICheckOutItem {
        return new CheckOutItem("A", 50.00)
    }

    public static newB():ICheckOutItem {
        return new CheckOutItem("B", 30.00)
    }

    public static newC():ICheckOutItem {
        return new CheckOutItem("C", 20.00)
    }
    
    public static newD():ICheckOutItem {
        return new CheckOutItem("D", 15.00)
    }
    
}
