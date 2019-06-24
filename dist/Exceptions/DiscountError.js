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
var DiscountError = /** @class */ (function (_super) {
    __extends(DiscountError, _super);
    function DiscountError(message) {
        return _super.call(this, "DiscountError: " + message) || this;
    }
    DiscountError.InvalidSku = "The SKU Is Not Valid";
    DiscountError.InvalidQuantity = "The Quantity of SKU Is Not Valid";
    DiscountError.InvalidTotalThreshold = "The Total Price Threshold is Not Valid";
    DiscountError.InvalidFixedDiscount = "The Fixed Discount Is Not Valid";
    DiscountError.InvalidPercentDiscount = "The Percent Discount Is Not Valid";
    return DiscountError;
}(Error));
exports.DiscountError = DiscountError;
