'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {CheckOut} from '../src/Classes/CheckOut'
import {CheckOutItemFactory} from '../src/Classes/CheckOutItemFactory'


describe("CheckOut total should reflect the total of items scanned", function(){

    it("should return 0, when no items scanned", function(){
        const checkout = new CheckOut()
        const price = checkout.total()

        expect(price).equal(0)
    })

    it("should return 50, when items scanned are: [A]", function(){
        const checkout = new CheckOut()
        checkout.scan(CheckOutItemFactory.newA())
        const price = checkout.total()

        expect(price).equal(50.00)
    })

})


describe("it should store scanned items", function(){

    it("should remember nothing, when nothing is scanned", function(){
        const checkout = new CheckOut()

        // TODO: determine how we can test items held in checkout
    })

})
