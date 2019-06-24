'use strict'

import {CheckOut} from './Controllers/CheckOut'
import {IDiscountCollection} from './Interfaces/IDiscountCollection'
import {DiscountCollection} from './Collections/DiscountCollection'
import {CheckOutItemFactory} from './Factories/CheckOutItemFactory'
import {DiscountFactory} from './Factories/DiscountFactory'
import {ErrorObserver} from './Exceptions/ErrorObserver'
import {TotalPercentDiscount} from './Models/TotalPercentDiscount'
import {CheckOutItem} from './Models/CheckOutItem'


// This creates an error observer that gets passed into key system components and allows:
// 1. caller to be aware of any execptions generated (console.error)
// 2. control if the checkout shout halt when an Error is thrown, or continue and ignore (but report) error
const errorObserver = new ErrorObserver(true)

/**
 * Helper function to create a batch of pre-set price rules - or Discounts - for a CheckOut
 * @param offers 
 */
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


/**
 * Helper function to run a single CheckOut scenario, passing aliases for pre-set checkout items and Price Rules - or discounts.
 * runScenario() performs all the actions needed for a single checkout transaction:
 * 1. creating discounts
 * 2. creating checkout items
 * 3. processing checkut items
 * 4. applying discounts
 * 5. returning total price
 * 
 * @param items 
 * @param offers 
 */
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


// Example scenarios based on the tech spec - but with no discounts applied
runScenario(["A", "B"], [])
runScenario(["A", "A"], [])
runScenario(["A", "A", "A"], [])
runScenario(["C", "D", "B", "A"], [])

// Example scenarios based on the tech spec, including the discoutns from the tech spec
runScenario(["A", "B"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["B", "B"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["A", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["A", "A", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["C", "D", "B", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])

// Example scenario with the optional discount of "10% off the total if you spend over $200"
runScenario(["A", "A", "A", "A"], ["tenPercentOffOverTwoHundred"])
runScenario(["A", "A", "A", "A", "A"], ["tenPercentOffOverTwoHundred"])

// Example scenarios testing the discount of 2 B's for $45
runScenario(["B", "B"], ["twentyPercentOffTwoBs"])
runScenario(["B", "B", "B"], ["twentyPercentOffTwoBs"])

// Example scenarios applying multiple discounts at the same time
runScenario(["B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"])
runScenario(["A", "A", "A", "B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"])
runScenario(["A", "A", "A", "A", "A", "A", "B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"])

// Example scenarios with bad input data
runScenario(["A", "B", "BAD"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["B", "B"], ["BAD", "fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
runScenario(["A", "A", "BAD"], ["BAD", "fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"])
