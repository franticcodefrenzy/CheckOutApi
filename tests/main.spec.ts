'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {CheckOut} from '../src/Classes/CheckOut'
import {CheckOutItemFactory} from '../src/Classes/CheckOutItemFactory'


describe("Checkout scenario tests", function() {

    it("should total 0, when no items scanned", function() {
        const checkout = new CheckOut()
        const price = checkout.total()

        expect(price).to.equal(0)
    })


    it("should total 50, when items scanned are: [A]", function() {
        const checkout = new CheckOut()
        checkout.scan(CheckOutItemFactory.newA())
        const price = checkout.total()

        expect(price).to.equal(50.00)
    })

})
