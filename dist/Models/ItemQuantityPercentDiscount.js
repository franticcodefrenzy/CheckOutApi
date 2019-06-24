'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Discount_1 = require("./Discount");
var DiscountError_1 = require("../Exceptions/DiscountError");
var ItemQuantityPercentDiscount = /** @class */ (function (_super) {
    __extends(ItemQuantityPercentDiscount, _super);
    function ItemQuantityPercentDiscount(sku, quantity, discount) {
        var _this = _super.call(this) || this;
        _this.sku = sku;
        _this.quantity = quantity;
        _this.discount = discount;
        return _this;
    }
    ItemQuantityPercentDiscount.prototype.getDiscount = function (items) {
        if (items.getQuantity(this.sku) >= this.quantity) {
            var unitPrice = items.getUnitPrice(this.sku);
            if (unitPrice !== null) {
                var amountOf = (unitPrice * this.quantity) * this.discount;
                this.description = "Total Percent Discount: " + amountOf;
                return amountOf;
            }
        }
        return 0;
    };
    ItemQuantityPercentDiscount.prototype.validate = function () {
        if (this.sku == null || this.sku.trim().length == 0) {
            throw new DiscountError_1.DiscountError(DiscountError_1.DiscountError.InvalidSku);
        }
        if (this.quantity < 1) {
            throw new DiscountError_1.DiscountError(DiscountError_1.DiscountError.InvalidQuantity);
        }
        if (this.discount <= 0 || this.discount >= 1) {
            throw new DiscountError_1.DiscountError(DiscountError_1.DiscountError.InvalidPercentDiscount);
        }
    };
    return ItemQuantityPercentDiscount;
}(Discount_1.Discount));
exports.ItemQuantityPercentDiscount = ItemQuantityPercentDiscount;
