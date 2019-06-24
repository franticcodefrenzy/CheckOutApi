'use strict'

import {CheckOut} from './Controllers/CheckOut'
import {IDiscountCollection} from './Interfaces/IDiscountCollection'
import {DiscountCollection} from './Collections/DiscountCollection'
import {CheckOutItemFactory} from './Factories/CheckOutItemFactory'
import {DiscountFactory} from './Factories/DiscountFactory'
import {ErrorObserver} from './Exceptions/ErrorObserver'
import {TotalPercentDiscount} from './Models/TotalPercentDiscount'
import {CheckOutItem} from './Models/CheckOutItem'


const errorObserver = new ErrorObserver(true)


function makeDiscounts(offers:string[]):IDiscountCollection {
    const discounts = new DiscountCollection(errorObserver)

    for (let i=0; i < offers.length; i++) {
        switch (offers[i]) {
            case "fixedTwentyOffThreeAs":         discounts.addDiscount(DiscountFactory.fixedTwentyOffThreeAs());  break
            case "fixedFifteenOffTwoBs":          discounts.addDiscount(DiscountFactory.fixedFifteenOffTwoBs());  break
            case "twentyPercentOffTwoBs":         discounts.addDiscount(DiscountFactory.twentyPercentOffTwoBs());  break
            case "tenPercentOffOverTwoHundred":   discounts.addDiscount(DiscountFactory.tenPercentOffOverTwoHundred());  break
            case "fixedFiftyOffOverThreeHundred": discounts.addDiscount(DiscountFactory.fixedFiftyOffOverThreeHundred());  break
            case "BAD":                           discounts.addDiscount(new TotalPercentDiscount(0.00, 50.00));  break

        }
    }

    return discounts
}


function runScenario(items:string[], offers:string[]):void {

    const checkout = new CheckOut(makeDiscounts(offers), errorObserver)

    console.log("\nStarting checkout process. Items: ", items, " Offers: ", offers, "...")

    for (let i=0; i<items.length; i++) {
        switch (items[i]) {
            case "A":   checkout.scan(CheckOutItemFactory.newA());    break
            case "B":   checkout.scan(CheckOutItemFactory.newB());    break
            case "C":   checkout.scan(CheckOutItemFactory.newC());    break
            case "D":   checkout.scan(CheckOutItemFactory.newD());    break
            case "BAD": checkout.scan(new CheckOutItem("A", -20.00)); break
        }
    }

    console.log("Checkout Total price: ", checkout.total())
    checkout.outputDiscountsApplied()
}


runScenario(["A", "B"], [])
runScenario(["A", "A"], [])
runScenario(["A", "A", "A"], [])
runScenario(["C", "D", "B", "A"], [])

runScenario(["A", "B"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["B", "B"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["A", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["A", "A", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["C", "D", "B", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])

runScenario(["A", "A", "A", "A"], ["tenPercentOffOverTwoHundred"])
runScenario(["A", "A", "A", "A", "A"], ["tenPercentOffOverTwoHundred"])

runScenario(["B", "B"], ["twentyPercentOffTwoBs"])
runScenario(["B", "B", "B"], ["twentyPercentOffTwoBs"])

runScenario(["B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"])
runScenario(["A", "A", "A", "B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"])
runScenario(["A", "A", "A", "A", "A", "A", "B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"])

runScenario(["A", "B", "BAD"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["B", "B"], ["BAD", "fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["A", "A", "BAD"], ["BAD", "fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
