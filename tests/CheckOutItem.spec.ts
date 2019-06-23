'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {CheckOutItem} from '../src/Classes/CheckOutItem'


describe("CheckOutItem should remember the properties it is created with", function(){

    it("Item A should be 50.00", function(){
        const item = new CheckOutItem("A", 50.00)

        expect(item.getSku()).equals("A")
        expect(item.getUnitPrice()).equals(50.00)
    })

    it("Item B should be 30.00", function(){
        const item = new CheckOutItem("B", 30.00)

        expect(item.getSku()).equals("B")
        expect(item.getUnitPrice()).equals(30.00)
    })

    it("Item C should be 20.00", function(){
        const item = new CheckOutItem("C", 20.00)

        expect(item.getSku()).equals("C")
        expect(item.getUnitPrice()).equals(20.00)
    })

    it("Item D should be 15.00", function(){
        const item = new CheckOutItem("D", 15.00)

        expect(item.getSku()).equals("D")
        expect(item.getUnitPrice()).equals(15.00)
    })

})
