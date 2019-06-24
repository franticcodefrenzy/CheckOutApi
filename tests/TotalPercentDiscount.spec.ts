'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {TotalPercentDiscount} from '../src/Models/TotalPercentDiscount'
import {MockCheckOutItemCollection} from './MockCheckOutItemCollection'


describe("Total Percent Discount applies correcly", function(){

    it("discounts 10% from 50.00 should be 5.00", function(){
        const collection = new MockCheckOutItemCollection(1, 50.00, 50.00)
        const discount   = new TotalPercentDiscount(49.00, 0.10)

        expect(discount.getDiscount(collection)).equals(5.00)
    })

    it("discounts 25% from 200.00 should be 50.00", function(){
        const collection = new MockCheckOutItemCollection(4, 50.00, 200.00)
        const discount   = new TotalPercentDiscount(199.00, 0.25)

        expect(discount.getDiscount(collection)).equals(50.00)
    })

    it("discounts 15% from 60.00 should be 9.00", function(){
        const collection = new MockCheckOutItemCollection(2, 30.00, 60.00)
        const discount   = new TotalPercentDiscount(59.00, 0.15)

        expect(discount.getDiscount(collection)).equals(9.00)
    })

})
