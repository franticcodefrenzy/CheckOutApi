'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class CheckOutItemCollection - is an implementation to hold an array of checkout items
 */
var CheckOutItemCollection = /** @class */ (function () {
    /**
     * Takes an optional error observer
     * @param errorObserver
     */
    function CheckOutItemCollection(errorObserver) {
        if (errorObserver === void 0) { errorObserver = null; }
        this.errorObserver = errorObserver;
        this.tally = {};
        this.unitPrices = {};
        this.items = [];
        this.cachedTotalPrice = null;
    }
    /**
     * Validates an item, then adds it if ok
     * @param item
     */
    CheckOutItemCollection.prototype.addItem = function (item) {
        try {
            item.validate();
            this.includeItem(item);
        }
        catch (error) {
            if (this.errorObserver) {
                this.errorObserver.handleError(error);
            }
            else {
                throw error;
            }
        }
    };
    /**
     * For discounts to get quantityi of SKU held
     * @param sku
     */
    CheckOutItemCollection.prototype.getQuantity = function (sku) {
        var quantity = this.tally[sku];
        return (typeof quantity == "undefined") ? 0 : quantity;
    };
    /**
     * For discounts to get unit prices for percent based discounts
     * @param sku
     */
    CheckOutItemCollection.prototype.getUnitPrice = function (sku) {
        return (typeof this.unitPrices[sku] == "undefined") ? null : this.unitPrices[sku];
    };
    /**
     * Calculates the prices just on items held, with no knowledge of discounts
     */
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
    /**
     * Performance improvement to make filtering discounts easier
     */
    CheckOutItemCollection.prototype.getTally = function () {
        return this.tally;
    };
    /**
     * Adds an item and records tally anf unit prices for performance
     * @param item
     */
    CheckOutItemCollection.prototype.includeItem = function (item) {
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
    return CheckOutItemCollection;
}());
exports.CheckOutItemCollection = CheckOutItemCollection;
