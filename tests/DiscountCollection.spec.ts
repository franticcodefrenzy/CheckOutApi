'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {DiscountCollection} from '../src/Collections/DiscountCollection'
import {DiscountFactory} from '../src/Factories/DiscountFactory'
import {MockCheckOutItemCollection} from './MockCheckOutItemCollection'


describe("When offers applied the total discount should reflect them", function(){

    it("should have 0 discount when no discounts added", function(){
        const discounts     = new DiscountCollection()
        const collection    = new MockCheckOutItemCollection(1, 50.00, 50.00)
        const totalDiscount = discounts.applyDiscounts(collection)

        expect(discounts.hasOffers()).equals(false)
        expect(totalDiscount).equals(0)
    })

    it("should have 50.00 discount", function(){
        const discounts     = new DiscountCollection()
        discounts.addDiscount(DiscountFactory.tenPercentOffOverTwoHundred())

        const collection    = new MockCheckOutItemCollection(10, 50.00, 500.00)
        const totalDiscount = discounts.applyDiscounts(collection)

        expect(discounts.hasOffers()).equals(true)
        expect(totalDiscount).equals(50.00)
    })

    it("should have 15.00 discount", function(){
        const discounts     = new DiscountCollection()
        discounts.addDiscount(DiscountFactory.fixedFifteenOffTwoBs())

        const collection    = new MockCheckOutItemCollection(10, 50.00, 500.00)
        const totalDiscount = discounts.applyDiscounts(collection)

        expect(discounts.hasOffers()).equals(true)
        expect(totalDiscount).equals(15.00)
    })

    it("should have 12.00 discount", function(){
        const discounts     = new DiscountCollection()
        discounts.addDiscount(DiscountFactory.twentyPercentOffTwoBs())

        const collection    = new MockCheckOutItemCollection(2, 30.00, 60.00)
        const totalDiscount = discounts.applyDiscounts(collection)

        expect(discounts.hasOffers()).equals(true)
        expect(totalDiscount).equals(12.00)
    })

    it("should have 0 discount, when no discounts apply", function(){
        const discounts     = new DiscountCollection()
        discounts.addDiscount(DiscountFactory.tenPercentOffOverTwoHundred())
        discounts.addDiscount(DiscountFactory.fixedFifteenOffTwoBs())
        discounts.addDiscount(DiscountFactory.fixedTwentyOffThreeAs())

        const collection    = new MockCheckOutItemCollection(1, 20.00, 20.00)
        const totalDiscount = discounts.applyDiscounts(collection)

        expect(discounts.hasOffers()).equals(true)
        expect(totalDiscount).equals(0.00)
    })

    

})
