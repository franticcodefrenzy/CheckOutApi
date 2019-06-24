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
var CheckOutItemError = /** @class */ (function (_super) {
    __extends(CheckOutItemError, _super);
    function CheckOutItemError(message) {
        return _super.call(this, "CheckOutItemError: " + message) || this;
    }
    CheckOutItemError.InvalidSku = "The SKU Is Not Valid";
    CheckOutItemError.InvalidUnitPrice = "The Unit Price is Not Valid";
    return CheckOutItemError;
}(Error));
exports.CheckOutItemError = CheckOutItemError;