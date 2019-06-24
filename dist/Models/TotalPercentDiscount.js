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
/**
 * @class TotalPercentDiscount - create discount of type: "10% off total > $100.00"
 */
var TotalPercentDiscount = /** @class */ (function (_super) {
    __extends(TotalPercentDiscount, _super);
    /**
     * Discount must be percent in form of fraction > 0 - 1
     * @param total
     * @param discount
     */
    function TotalPercentDiscount(total, discount) {
        var _this = _super.call(this) || this;
        _this.total = total;
        _this.discount = discount;
        return _this;
    }
    TotalPercentDiscount.prototype.getDiscount = function (items) {
        var totalPrice = items.calcPrice();
        if (totalPrice > this.total) {
            var amountOf = totalPrice * this.discount;
            this.description = "Total Percent Discount: " + amountOf;
            return amountOf;
        }
        return 0;
    };
    TotalPercentDiscount.prototype.validate = function () {
        if (this.total < 1) {
            throw new DiscountError_1.DiscountError(DiscountError_1.DiscountError.InvalidTotalThreshold);
        }
        if (this.discount <= 0 || this.discount >= 1) {
            throw new DiscountError_1.DiscountError(DiscountError_1.DiscountError.InvalidPercentDiscount);
        }
    };
    return TotalPercentDiscount;
}(Discount_1.Discount));
exports.TotalPercentDiscount = TotalPercentDiscount;
