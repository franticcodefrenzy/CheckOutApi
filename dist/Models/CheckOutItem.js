'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOutItemError_1 = require("../Exceptions/CheckOutItemError");
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
    CheckOutItem.prototype.validate = function () {
        if (this.sku == null || this.sku.trim().length == 0) {
            throw new CheckOutItemError_1.CheckOutItemError(CheckOutItemError_1.CheckOutItemError.InvalidSku);
        }
        if (this.unitPrice < 1) {
            throw new CheckOutItemError_1.CheckOutItemError(CheckOutItemError_1.CheckOutItemError.InvalidUnitPrice);
        }
    };
    return CheckOutItem;
}());
exports.CheckOutItem = CheckOutItem;
