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
var TotalFixedDiscount = /** @class */ (function (_super) {
    __extends(TotalFixedDiscount, _super);
    function TotalFixedDiscount(total, discount) {
        var _this = _super.call(this) || this;
        _this.total = total;
        _this.discount = discount;
        return _this;
    }
    TotalFixedDiscount.prototype.getDiscount = function (items) {
        if (items.calcPrice() > this.total) {
            this.description = "Total Fixed Discount: " + this.discount;
            return this.discount;
        }
        return 0;
    };
    TotalFixedDiscount.prototype.validate = function () {
        if (this.total < 1) {
            throw new DiscountError_1.DiscountError(DiscountError_1.DiscountError.InvalidTotalThreshold);
        }
        if (this.discount < 1) {
            throw new DiscountError_1.DiscountError(DiscountError_1.DiscountError.InvalidFixedDiscount);
        }
    };
    return TotalFixedDiscount;
}(Discount_1.Discount));
exports.TotalFixedDiscount = TotalFixedDiscount;
