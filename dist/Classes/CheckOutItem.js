'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOutItem = /** @class */ (function () {
    function CheckOutItem(sku, unitPrice) {
        this.sku = sku;
        this.unitPrice = unitPrice;
    }
    CheckOutItem.prototype.getSku = function () {
        return this.sku;
    };
    CheckOutItem.prototype.getUnitPrice = function () {
        return this.unitPrice;
    };
    return CheckOutItem;
}());
exports.CheckOutItem = CheckOutItem;
