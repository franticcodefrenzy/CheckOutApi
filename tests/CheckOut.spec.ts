'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {CheckOut} from '../src/Controllers/CheckOut'
import {CheckOutItemFactory} from '../src/Factories/CheckOutItemFactory'
import {DiscountCollection} from '../src/Collections/DiscountCollection'
import {DiscountFactory} from '../src/Factories/DiscountFactory'
import {ErrorObserver} from '../src/Exceptions/ErrorObserver'
import {CheckOutItemError} from '../src/Exceptions/CheckOutItemError'
import {DiscountError} from '../src/Exceptions/DiscountError'
import {CheckOutItem} from '../src/Models/CheckOutItem'
import {ItemQuantityFixedDiscount} from '../src/Models/ItemQuantityFixedDiscount'
import {TotalPercentDiscount} from '../src/Models/TotalPercentDiscount'


describe("CheckOut total should match items scanned, with no pricing rules", function(){

    beforeEach(function(){
        this.checkout = new CheckOut()
    })


    it("should return 0, when no items scanned", function(){
        expect(this.checkout.total()).equal(0)
    })

    it("should return 50, when items scanned are: [A]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())

        expect(this.checkout.total()).equal(50.00)
    })

    it("should return 30, when items scanned are: [B]", function(){
        this.checkout.scan(CheckOutItemFactory.newB())

        expect(this.checkout.total()).equal(30.00)
    })

    it("should return 20, when items scanned are: [C]", function(){
        this.checkout.scan(CheckOutItemFactory.newC())

        expect(this.checkout.total()).equal(20.00)
    })

    it("should return 15, when items scanned are: [D]", function(){
        this.checkout.scan(CheckOutItemFactory.newD())

        expect(this.checkout.total()).equal(15.00)
    })

    it("should return 80, when items scanned are: [A, B]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newB())

        expect(this.checkout.total()).equal(80.00)
    })

    it("should return 80, when items scanned are: [A, A]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())

        expect(this.checkout.total()).equal(100.00)
    })

    it("should return 80, when items scanned are: [A, A, A]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())

        expect(this.checkout.total()).equal(150.00)
    })

    it("should return 80, when items scanned are: [C, D, B, A]", function(){
        this.checkout.scan(CheckOutItemFactory.newC())
        this.checkout.scan(CheckOutItemFactory.newD())
        this.checkout.scan(CheckOutItemFactory.newB())
        this.checkout.scan(CheckOutItemFactory.newA())

        expect(this.checkout.total()).equal(115.00)
    })

})


describe("CheckOut total should match items scanned, with pricing rules: [3xA for 130, 2xB for 45]", function(){

    beforeEach(function(){
        const discounts = new DiscountCollection()
        discounts.addDiscount(DiscountFactory.fixedTwentyOffThreeAs())
        discounts.addDiscount(DiscountFactory.fixedFifteenOffTwoBs())

        this.checkout = new CheckOut(discounts)
    })
    

    it("should return 80, when items scanned are: [A, B]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newB())

        expect(this.checkout.total()).equal(80.00)
    })

    it("should return 80, when items scanned are: [A, A]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())

        expect(this.checkout.total()).equal(100.00)
    })

    it("should return 80, when items scanned are: [A, A, A]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())

        expect(this.checkout.total()).equal(130.00)
    })

    it("should return 80, when items scanned are: [C, D, B, A]", function(){
        this.checkout.scan(CheckOutItemFactory.newC())
        this.checkout.scan(CheckOutItemFactory.newD())
        this.checkout.scan(CheckOutItemFactory.newB())
        this.checkout.scan(CheckOutItemFactory.newA())

        expect(this.checkout.total()).equal(115.00)
    })

})


describe("CheckOut total should match items scanned, with pricing rules: [10% off 200 total]", function(){

    beforeEach(function(){
        const discounts = new DiscountCollection()
        discounts.addDiscount(DiscountFactory.tenPercentOffOverTwoHundred())

        this.checkout = new CheckOut(discounts)
    })


    it("should return 200.00, when items scanned are: [A, A, A, A]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())

        expect(this.checkout.total()).equal(200.00)
    })

    it("should return 225.00, when items scanned are: [A, A, A, A, A]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())

        expect(this.checkout.total()).equal(225.00)
    })

    it("should return 234.00, when items scanned are: [A, A, A, A, B, B]", function(){
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newA())
        this.checkout.scan(CheckOutItemFactory.newB())
        this.checkout.scan(CheckOutItemFactory.newB())

        expect(this.checkout.total()).equal(234.00)
    })

})


describe("ErrorObserver picks up errors generated from bad items or discounts", function(){

    it("alerts error for bad checkout item that has no sku", function(){
        const checkout = new CheckOut(null, new ErrorObserver(false))
        const badItem  = new CheckOutItem(null, 20.00)

        var problemCall = () => { checkout.scan(badItem) }

        expect(problemCall).to.throw("CheckOutItemError: The SKU Is Not Valid")
    })

    it("alerts error for bad checkout item that has invalid unit price", function(){
        const checkout = new CheckOut(null, new ErrorObserver(false))
        const badItem  = new CheckOutItem("A", -20.00)

        var problemCall = () => { checkout.scan(badItem) }

        expect(problemCall).to.throw("CheckOutItemError: The Unit Price is Not Valid")
    })

    it("skips bad checkout items, without throwing an exception", function(){
        const checkout = new CheckOut(null, new ErrorObserver(true))
        checkout.scan(new CheckOutItem(null, 20.00))
        checkout.scan(new CheckOutItem("A", -20.00))
        checkout.scan(new CheckOutItem("A", 50.00))

        expect(checkout.total()).equal(50.00)
    })

    it("alerts error for discount with no sku", function(){
        const discounts = new DiscountCollection(new ErrorObserver(false))
        const badDiscount = new ItemQuantityFixedDiscount(null, 2, 20.00)

        var problemCall = () => { discounts.addDiscount(badDiscount) }

        expect(problemCall).to.throw("DiscountError: The SKU Is Not Valid")
    })

    it("alerts error for discount with bad total", function(){
        const discounts   = new DiscountCollection(new ErrorObserver(false))
        const badDiscount = new TotalPercentDiscount(0.00, 50.00)

        var problemCall = () => { discounts.addDiscount(badDiscount) }

        expect(problemCall).to.throw("DiscountError: The Total Price Threshold is Not Valid")
    })

    it("skips bad items and discounts and carries on", function(){
        const observer  = new ErrorObserver(true)
        const discounts = new DiscountCollection(observer)
        discounts.addDiscount(new ItemQuantityFixedDiscount(null, 2, 20.00))
        discounts.addDiscount(new TotalPercentDiscount(0.00, 50.00))
        discounts.addDiscount(new TotalPercentDiscount(100.00, 0.10))

        const checkout = new CheckOut(discounts, observer)
        checkout.scan(new CheckOutItem(null, 20.00))
        checkout.scan(new CheckOutItem("A", -20.00))
        checkout.scan(new CheckOutItem("A", 50.00))
        checkout.scan(new CheckOutItem("A", 50.00))
        checkout.scan(new CheckOutItem("A", 50.00))

        expect(checkout.total()).equal(135.00)
    })

})
