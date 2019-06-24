'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOutItemCollection = /** @class */ (function () {
    function CheckOutItemCollection() {
        this.tally = {};
        this.unitPrices = {};
        this.items = [];
        this.cachedTotalPrice = null;
    }
    CheckOutItemCollection.prototype.addItem = function (item) {
        this.items.push(item);
        var sku = item.getSku();
        if (typeof this.tally[sku] == "undefined") {
            this.tally[sku] = 1;
            this.unitPrices[sku] = item.getUnitPrice();
        }
        else {
            this.tally[sku]++;
        }
    };
    CheckOutItemCollection.prototype.getQuantity = function (sku) {
        var quantity = this.tally[sku];
        return (typeof quantity == "undefined") ? 0 : quantity;
    };
    CheckOutItemCollection.prototype.getUnitPrice = function (sku) {
        return (typeof this.unitPrices[sku] == "undefined") ? null : this.unitPrices[sku];
    };
    CheckOutItemCollection.prototype.calcPrice = function () {
        var _this = this;
        if (this.cachedTotalPrice === null) {
            this.cachedTotalPrice = 0;
            this.items.forEach(function (item) {
                _this.cachedTotalPrice += item.getUnitPrice();
            });
        }
        return this.cachedTotalPrice;
    };
    CheckOutItemCollection.prototype.getTally = function () {
        return this.tally;
    };
    return CheckOutItemCollection;
}());
exports.CheckOutItemCollection = CheckOutItemCollection;
