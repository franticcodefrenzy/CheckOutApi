'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOut_1 = require("./Controllers/CheckOut");
var DiscountCollection_1 = require("./Collections/DiscountCollection");
var CheckOutItemFactory_1 = require("./Factories/CheckOutItemFactory");
var DiscountFactory_1 = require("./Factories/DiscountFactory");
var ErrorObserver_1 = require("./Exceptions/ErrorObserver");
var TotalPercentDiscount_1 = require("./Models/TotalPercentDiscount");
var CheckOutItem_1 = require("./Models/CheckOutItem");
var errorObserver = new ErrorObserver_1.ErrorObserver(true);
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
runScenario(["A", "B"], []);
runScenario(["A", "A"], []);
runScenario(["A", "A", "A"], []);
runScenario(["C", "D", "B", "A"], []);
runScenario(["A", "B"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["B", "B"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["A", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["A", "A", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["C", "D", "B", "A"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["A", "A", "A", "A"], ["tenPercentOffOverTwoHundred"]);
runScenario(["A", "A", "A", "A", "A"], ["tenPercentOffOverTwoHundred"]);
runScenario(["B", "B"], ["twentyPercentOffTwoBs"]);
runScenario(["B", "B", "B"], ["twentyPercentOffTwoBs"]);
runScenario(["B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"]);
runScenario(["A", "A", "A", "B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"]);
runScenario(["A", "A", "A", "A", "A", "A", "B", "B"], ["fixedTwentyOffThreeAs", "twentyPercentOffTwoBs", "fixedFiftyOffOverThreeHundred"]);
runScenario(["A", "B", "BAD"], ["fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["B", "B"], ["BAD", "fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
runScenario(["A", "A", "BAD"], ["BAD", "fixedTwentyOffThreeAs", "fixedFifteenOffTwoBs"]);
