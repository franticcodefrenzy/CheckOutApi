'use strict'

export class TestItemFactory {

    public static newA() {
        return {SKU: "A", UnitPrice: 50.00}
    }


    public static newB() {
        return {SKU: "B", UnitPrice: 30.00}
    }

    public static newC() {
        return {SKU: "C", UnitPrice: 20.00}
    }
    

    public static newD() {
        return {SKU: "D", UnitPrice: 15.00}
    }
}
