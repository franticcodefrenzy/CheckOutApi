'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOutItem_1 = require("../Models/CheckOutItem");
var CheckOutItemFactory = /** @class */ (function () {
    function CheckOutItemFactory() {
    }
    CheckOutItemFactory.newA = function () {
        return new CheckOutItem_1.CheckOutItem("A", 50.00);
    };
    CheckOutItemFactory.newB = function () {
        return new CheckOutItem_1.CheckOutItem("B", 30.00);
    };
    CheckOutItemFactory.newC = function () {
        return new CheckOutItem_1.CheckOutItem("C", 20.00);
    };
    CheckOutItemFactory.newD = function () {
        return new CheckOutItem_1.CheckOutItem("D", 15.00);
    };
    return CheckOutItemFactory;
}());
exports.CheckOutItemFactory = CheckOutItemFactory;
