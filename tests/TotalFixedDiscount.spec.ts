'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {TotalFixedDiscount} from '../src/Models/TotalFixedDiscount'
import {MockCheckOutItemCollection} from './MockCheckOutItemCollection'


describe("Total Fixed Discount applies correcly", function(){

    it("discounts 12.00 off 60.00, from 50.00 total should be 0.00", function(){
        const collection = new MockCheckOutItemCollection(2, 25.00, 50.00)
        const discount   = new TotalFixedDiscount(60.00, 12.00)

        expect(discount.getDiscount(collection)).equals(0.00)
    })

    it("discounts 12.00 off 60.00, from 70.00 total should be 12.00", function(){
        const collection = new MockCheckOutItemCollection(2, 25.00, 70.00)
        const discount   = new TotalFixedDiscount(60.00, 12.00)

        expect(discount.getDiscount(collection)).equals(12.00)
    })

    it("discounts 50 off 300.00, from 350.00 total, should be 300.00", function(){
        const collection = new MockCheckOutItemCollection(10, 30.00, 350.00)
        const discount   = new TotalFixedDiscount(300.00, 50.00)

        expect(discount.getDiscount(collection)).equals(50.00)
    })

})
