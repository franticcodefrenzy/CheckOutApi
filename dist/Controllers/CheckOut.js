'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOutItemCollection_1 = require("../Collections/CheckOutItemCollection");
var CheckOut = /** @class */ (function () {
    function CheckOut(discounts) {
        if (discounts === void 0) { discounts = null; }
        this.items = new CheckOutItemCollection_1.CheckOutItemCollection();
        this.discounts = discounts;
    }
    CheckOut.prototype.scan = function (item) {
        this.items.addItem(item);
    };
    CheckOut.prototype.total = function () {
        var basePrice = this.items.calcPrice();
        var totalDiscount = 0;
        if (this.discounts) {
            totalDiscount = this.discounts.applyDiscounts(this.items);
        }
        return basePrice - totalDiscount;
    };
    CheckOut.prototype.outputDiscountsApplied = function () {
        if (this.discounts && this.discounts.hasOffers()) {
            var descriptions = this.discounts.getDiscountDescriptions();
            if (descriptions.length > 0) {
                descriptions.forEach(function (offer) {
                    console.log("**Offer applied: ", offer);
                });
            }
            else {
                console.log("(No offers applied)");
            }
        }
        else {
            console.log("(No offers loaded)");
        }
    };
    return CheckOut;
}());
exports.CheckOut = CheckOut;
