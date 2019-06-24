'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {CheckOut} from '../src/Classes/CheckOut'
import {CheckOutItemFactory} from '../src/Classes/CheckOutItemFactory'


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
        this.checkout = new CheckOut()
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

   

})


describe("CheckOut total should match items scanned, with pricing rules: [3xA for 130, 2xB for 45, 10% off 200 total]", function(){

   

})
