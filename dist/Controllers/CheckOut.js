'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOutItemCollection_1 = require("../Collections/CheckOutItemCollection");
/**
 * @class CheckOut is the main interface (Controller) to the whole checkout process
 */
var CheckOut = /** @class */ (function () {
    /**
     * Both discount collection and an observer are optional
     * @param discounts
     * @param errorObserver
     */
    function CheckOut(discounts, errorObserver) {
        if (discounts === void 0) { discounts = null; }
        if (errorObserver === void 0) { errorObserver = null; }
        this.errorObserver = errorObserver;
        this.items = new CheckOutItemCollection_1.CheckOutItemCollection(errorObserver);
        this.discounts = discounts;
    }
    /**
     * Scans and Items - the work being done by the underlying collection
     * @param item
     */
    CheckOut.prototype.scan = function (item) {
        this.items.addItem(item);
    };
    /**
     * Performs the full calculation of item value and applies discounts
     * @return number
     */
    CheckOut.prototype.total = function () {
        var basePrice = this.items.calcPrice();
        var totalDiscount = 0;
        if (this.discounts) {
            totalDiscount = this.discounts.applyDiscounts(this.items);
        }
        return basePrice - totalDiscount;
    };
    /**
     * Debug function to show what discounts were applied to the CheckOut process
     */
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
