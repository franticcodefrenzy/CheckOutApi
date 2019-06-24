'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var DiscountCollection = /** @class */ (function () {
    function DiscountCollection() {
        this.discounts = [];
        this.reset();
    }
    DiscountCollection.prototype.addDiscount = function (discount) {
        this.discounts.push(discount);
    };
    DiscountCollection.prototype.applyDiscounts = function (items) {
        var _this = this;
        this.reset();
        this.discounts.forEach(function (offer) {
            var discount = offer.getDiscount(items);
            if (discount > 0) {
                _this.totalDiscount += discount;
                _this.discountsApplied.push(offer.getOfferDescripton());
            }
        });
        return this.totalDiscount;
    };
    DiscountCollection.prototype.getDiscountDescriptions = function () {
        return this.discountsApplied;
    };
    DiscountCollection.prototype.hasOffers = function () {
        return this.discounts.length > 0;
    };
    DiscountCollection.prototype.reset = function () {
        this.discountsApplied = [];
        this.totalDiscount = 0;
    };
    return DiscountCollection;
}());
exports.DiscountCollection = DiscountCollection;
