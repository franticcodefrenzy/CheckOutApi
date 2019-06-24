'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var TotalFixedDiscount_1 = require("../Models/TotalFixedDiscount");
var TotalPercentDiscount_1 = require("../Models/TotalPercentDiscount");
var ItemQuantityPercentDiscount_1 = require("../Models/ItemQuantityPercentDiscount");
var ItemQuantityFixedDiscount_1 = require("../Models/ItemQuantityFixedDiscount");
var DiscountFactory = /** @class */ (function () {
    function DiscountFactory() {
    }
    DiscountFactory.fixedTwentyOffThreeAs = function () {
        return new ItemQuantityFixedDiscount_1.ItemQuantityFixedDiscount("A", 3, 20.00);
    };
    DiscountFactory.fixedFifteenOffTwoBs = function () {
        return new ItemQuantityFixedDiscount_1.ItemQuantityFixedDiscount("B", 2, 15.00);
    };
    DiscountFactory.twentyPercentOffTwoBs = function () {
        return new ItemQuantityPercentDiscount_1.ItemQuantityPercentDiscount("B", 2, 0.20);
    };
    DiscountFactory.tenPercentOffOverTwoHundred = function () {
        return new TotalPercentDiscount_1.TotalPercentDiscount(200.00, 0.10);
    };
    DiscountFactory.fixedFiftyOffOverThreeHundred = function () {
        return new TotalFixedDiscount_1.TotalFixedDiscount(300.00, 50.00);
    };
    return DiscountFactory;
}());
exports.DiscountFactory = DiscountFactory;
