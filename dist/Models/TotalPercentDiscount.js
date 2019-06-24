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
var TotalPercentDiscount = /** @class */ (function (_super) {
    __extends(TotalPercentDiscount, _super);
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
    return TotalPercentDiscount;
}(Discount_1.Discount));
exports.TotalPercentDiscount = TotalPercentDiscount;
