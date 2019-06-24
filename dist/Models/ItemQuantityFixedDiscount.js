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
var ItemQuantityFixedDiscount = /** @class */ (function (_super) {
    __extends(ItemQuantityFixedDiscount, _super);
    function ItemQuantityFixedDiscount(sku, quantity, discount) {
        var _this = _super.call(this) || this;
        _this.sku = sku;
        _this.quantity = quantity;
        _this.discount = discount;
        return _this;
    }
    ItemQuantityFixedDiscount.prototype.getDiscount = function (items) {
        if (items.getQuantity(this.sku) >= this.quantity) {
            this.description = "Total Fixed Discount: " + this.discount;
            return this.discount;
        }
        return 0;
    };
    return ItemQuantityFixedDiscount;
}(Discount_1.Discount));
exports.ItemQuantityFixedDiscount = ItemQuantityFixedDiscount;
