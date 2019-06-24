'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOut_1 = require("./Controllers/CheckOut");
var DiscountCollection_1 = require("./Collections/DiscountCollection");
var CheckOutItemFactory_1 = require("./Factories/CheckOutItemFactory");
var DiscountFactory_1 = require("./Factories/DiscountFactory");
var ErrorObserver_1 = require("./Exceptions/ErrorObserver");
var TotalPercentDiscount_1 = require("./Models/TotalPercentDiscount");
var CheckOutItem_1 = require("./Models/CheckOutItem");
// This creates an error observer that gets passed into key system components and allows:
// 1. caller to be aware of any execptions generated (console.error)
// 2. control if the checkout shout halt when an Error is thrown, or continue and ignore (but report) error
var errorObserver = new ErrorObserver_1.ErrorObserver(true);
/**
 * Helper function to create a batch of pre-set price rules - or Discounts - for a CheckOut
 * @param offers
 */
function makeDiscounts(offers) {
    var discounts = new DiscountCollection_1.DiscountCollection(errorObserver);
    for (var i = 0; i < offers.length; i++) {
        switch (offers[i]) {
            case "fixedTwentyOffThreeAs":
                discounts.addDiscount(DiscountFactory_1.DiscountFactory.fixedTwentyOffThreeAs());
                break;
            case "fixedFifteenOffTwoBs":
                discounts.addDiscount(DiscountFactory_1.DiscountFactory.fixedFifteenOffTwoBs());
                break;
            case "twentyPercentOffTwoBs":
                discounts.addDiscount(DiscountFactory_1.DiscountFactory.twentyPercentOffTwoBs());
                break;
            case "tenPercentOffOverTwoHundred":
                discounts.addDiscount(DiscountFactory_1.DiscountFactory.tenPercentOffOverTwoHundred());
                break;
            case "fixedFiftyOffOverThreeHundred":
                discounts.addDiscount(DiscountFactory_1.DiscountFactory.fixedFiftyOffOverThreeHundred());
                break;
            case "BAD":
                discounts.addDiscount(new TotalPercentDiscount_1.TotalPercentDiscount(0.00, 50.00));
                break;
        }
    }
    return discounts;
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
function runScenario(items, offers) {
    var checkout = new CheckOut_1.CheckOut(makeDiscounts(offers), errorObserver);
    console.log("\nStarting checkout process. Items: ", items, " Offers: ", offers, "...");
    for (var i = 0; i < items.length; i++) {
        switch (items[i]) {
            case "A":
                checkout.scan(CheckOutItemFactory_1.CheckOutItemFactory.newA());
                break;
            case "B":
                checkout.scan(CheckOutItemFactory_1.CheckOutItemFactory.newB());
                break;
            case "C":
                checkout.scan(CheckOutItemFactory_1.CheckOutItemFactory.newC());
                break;
            case "D":
                checkout.scan(CheckOutItemFactory_1.CheckOutItemFactory.newD());
                break;
            case "BAD":
                checkout.scan(new CheckOutItem_1.CheckOutItem("A", -20.00));
                break;
        }
    }
    console.log("Checkout Total price: ", checkout.total());
    checkout.outputDiscountsApplied();
}
// Example scenarios based on the tech spec - but with no discounts applied
runScenario(["A", "B"], []);
runScenario(["A", "A"], []);
runScenario(["A", "A", "A"], []);
runScenario(["C", "D", "B", "A"], []);
// Example scenarios based on the tech spec, including the discoutns from the tech spec
runScenario(["A", "B"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["B", "B"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["A", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["A", "A", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["C", "D", "B", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
// Example scenario with the optional discount of "10% off the total if you spend over $200"
runScenario(["A", "A", "A", "A"], ["tenPercentOffOverTwoHundred"]);
runScenario(["A", "A", "A", "A", "A"], ["tenPercentOffOverTwoHundred"]);
// Example scenarios testing the discount of 2 B's for $45
runScenario(["B", "B"], ["twentyPercentOffTwoBs"]);
runScenario(["B", "B", "B"], ["twentyPercentOffTwoBs"]);
// Example scenarios applying multiple discounts at the same time
runScenario(["B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"]);
runScenario(["A", "A", "A", "B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"]);
runScenario(["A", "A", "A", "A", "A", "A", "B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"]);
// Example scenarios with bad input data
runScenario(["A", "B", "BAD"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["B", "B"], ["BAD", "fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["A", "A", "BAD"], ["BAD", "fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
