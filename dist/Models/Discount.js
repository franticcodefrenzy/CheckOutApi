'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class Discount - forms base for discounts, implementing the getOfferDescription()
 * which doesnt need to be different for each IDiscount implementation
 */
var Discount = /** @class */ (function () {
    function Discount() {
        this.description = null;
    }
    Discount.prototype.getOfferDescripton = function () {
        return this.description;
    };
    return Discount;
}());
exports.Discount = Discount;
