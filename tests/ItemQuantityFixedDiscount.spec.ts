'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {ItemQuantityFixedDiscount} from '../src/Models/ItemQuantityFixedDiscount'
import {MockCheckOutItemCollection} from './MockCheckOutItemCollection'


describe("Item Quantity Fixed Discount applies correcly", function(){

    it("discounts 50.00 for 5, from 3x50.00, should be 0.00", function(){
        const collection = new MockCheckOutItemCollection(3, 50.00, 150.00)
        const discount   = new ItemQuantityFixedDiscount("A", 5, 50.00)

        expect(discount.getDiscount(collection)).equals(0.00)
    })

    it("discounts 50.00 for 5, from 5x50.00, should be 50.00", function(){
        const collection = new MockCheckOutItemCollection(5, 50.00, 250.00)
        const discount   = new ItemQuantityFixedDiscount("A", 5, 50.00)

        expect(discount.getDiscount(collection)).equals(50.00)
    })

    it("discounts 15.00 for 5, from 10x10.00, should be 15.00", function(){
        const collection = new MockCheckOutItemCollection(10, 10.00, 1050.00)
        const discount   = new ItemQuantityFixedDiscount("A", 5, 15.00)

        expect(discount.getDiscount(collection)).equals(15.00)
    })

})
