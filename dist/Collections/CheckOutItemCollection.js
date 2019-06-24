'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var CheckOutItemCollection = /** @class */ (function () {
    function CheckOutItemCollection() {
        this.tally = {};
        this.items = [];
    }
    CheckOutItemCollection.prototype.addItem = function (item) {
        this.items.push(item);
        var sku = item.getSku();
        if (typeof this.tally[sku] == "undefined") {
            this.tally[sku] = 1;
        }
        else {
            this.tally[sku]++;
        }
    };
    CheckOutItemCollection.prototype.getQuantity = function (sku) {
        var quantity = this.tally[sku];
        return (typeof quantity == "undefined") ? 0 : quantity;
    };
    CheckOutItemCollection.prototype.getUnitPrice = function (sku) {
        if (typeof this.tally[sku] != "undefined") {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].getSku() == sku) {
                    return this.items[i].getUnitPrice();
                }
            }
        }
        return null;
    };
    CheckOutItemCollection.prototype.calcPrice = function () {
        var price = 0;
        this.items.forEach(function (item) {
            price += item.getUnitPrice();
        });
        return price;
    };
    return CheckOutItemCollection;
}());
exports.CheckOutItemCollection = CheckOutItemCollection;
