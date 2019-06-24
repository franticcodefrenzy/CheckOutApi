'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOutItemCollection_1 = require("./CheckOutItemCollection");
var CheckOut = /** @class */ (function () {
    function CheckOut() {
        this.items = new CheckOutItemCollection_1.CheckOutItemCollection();
    }
    CheckOut.prototype.scan = function (item) {
        this.items.addItem(item);
    };
    CheckOut.prototype.total = function () {
        return this.items.calcPrice();
    };
    return CheckOut;
}());
exports.CheckOut = CheckOut;
