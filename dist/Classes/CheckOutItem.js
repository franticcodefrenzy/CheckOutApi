'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOutItem = /** @class */ (function () {
    function CheckOutItem(sku, unitPrice) {
        this.SKU = sku;
        this.UnitPrice = unitPrice;
    }
    CheckOutItem.prototype.getSku = function () {
        return this.SKU;
    };
    CheckOutItem.prototype.getUnitPrice = function () {
        return this.UnitPrice;
    };
    return CheckOutItem;
}());
exports.CheckOutItem = CheckOutItem;
