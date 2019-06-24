'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {ItemQuantityPercentDiscount} from '../src/Models/ItemQuantityPercentDiscount'
import {MockCheckOutItemCollection} from './MockCheckOutItemCollection'


describe("Item Quantity Percent Discount applies correcly", function(){

    it("discounts 10% for 3, from 3x50.00 should be 15.00", function(){
        const collection = new MockCheckOutItemCollection(3, 50.00, 150.00)
        const discount   = new ItemQuantityPercentDiscount("A", 3, 0.10)

        expect(discount.getDiscount(collection)).equals(15.00)
    })

    it("discounts 10% for 4, from 3x50.00 should be 0.00", function(){
        const collection = new MockCheckOutItemCollection(3, 50.00, 150.00)
        const discount   = new ItemQuantityPercentDiscount("A", 4, 0.10)

        expect(discount.getDiscount(collection)).equals(0.00)
    })

    it("discounts 25% for 5 from 10x10.00 should be 12.50", function(){
        const collection = new MockCheckOutItemCollection(10, 10.00, 100.00)
        const discount   = new ItemQuantityPercentDiscount("A", 5, 0.25)

        expect(discount.getDiscount(collection)).equals(12.50)
    })

})
