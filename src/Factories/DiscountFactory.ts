'use strict'

import {IDiscount} from '../Interfaces/IDiscount'
import {TotalFixedDiscount} from '../Models/TotalFixedDiscount'
import {TotalPercentDiscount} from '../Models/TotalPercentDiscount'
import {ItemQuantityPercentDiscount} from '../Models/ItemQuantityPercentDiscount'
import {ItemQuantityFixedDiscount} from '../Models/ItemQuantityFixedDiscount'

/**
 * @class DiscountFactory - Helper to create pre-set Discounts
 */
export class DiscountFactory {

    public static fixedTwentyOffThreeAs():IDiscount {
        return new ItemQuantityFixedDiscount("A", 3, 20.00)
    }

    public static fixedFifteenOffTwoBs():IDiscount {
        return new ItemQuantityFixedDiscount("B", 2, 15.00)
    }

    public static twentyPercentOffTwoBs():IDiscount {
        return new ItemQuantityPercentDiscount("B", 2, 0.20)
    }

    public static tenPercentOffOverTwoHundred():IDiscount {
        return new TotalPercentDiscount(200.00, 0.10)
    }

    public static fixedFiftyOffOverThreeHundred():IDiscount {
        return new TotalFixedDiscount(300.00, 50.00)
    }

}
