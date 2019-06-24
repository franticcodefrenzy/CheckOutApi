'use strict'

import 'mocha'
import {expect, should} from 'chai'
import {CheckOutItemCollection} from '../src/Classes/CheckOutItemCollection'
import {CheckOutItemFactory} from '../src/Classes/CheckOutItemFactory'


describe("CheckOutItemCollection, with no pricing rules, should store, tally and price items stored", function(){

    beforeEach(function(){
        this.collection = new CheckOutItemCollection()

        this.expectTally = function(A:number, B:number, C:number, D:number){
            expect(this.collection.getQuantity("A")).equal(A)
            expect(this.collection.getQuantity("B")).equal(B)
            expect(this.collection.getQuantity("C")).equal(C)
            expect(this.collection.getQuantity("D")).equal(D)
        }
    })


    it("should be accurate, when no items scanned", function(){
        expect(this.collection.calcPrice()).equal(0)
        this.expectTally(0, 0, 0, 0)
    })

    it("should be accurate, when items scanned are: [A]", function(){
        this.collection.addItem(CheckOutItemFactory.newA())

        expect(this.collection.calcPrice()).equal(50.00)
        this.expectTally(1, 0, 0, 0)
    })

    it("should be accurate, when items scanned are: [B]", function(){
        this.collection.addItem(CheckOutItemFactory.newB())

        expect(this.collection.calcPrice()).equal(30.00)
        this.expectTally(0, 1, 0, 0)
    })

    it("should be accurate, when items scanned are: [C]", function(){
        this.collection.addItem(CheckOutItemFactory.newC())

        expect(this.collection.calcPrice()).equal(20.00)
        this.expectTally(0, 0, 1, 0)
    })

    it("should be accurate, when items scanned are: [D]", function(){
        this.collection.addItem(CheckOutItemFactory.newD())

        expect(this.collection.calcPrice()).equal(15.00)
        this.expectTally(0, 0, 0, 1)
    })

    it("should be accurate, when items scanned are: [A, A]", function(){
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newA())

        expect(this.collection.calcPrice()).equal(100.00)
        this.expectTally(2, 0, 0, 0)
    })

    it("should be accurate, when items scanned are: [A, A, A]", function(){
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newA())

        expect(this.collection.calcPrice()).equal(150.00)
        this.expectTally(3, 0, 0, 0)
    })

    it("should be accurate, when items scanned are: [A, A, B]", function(){
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newB())

        expect(this.collection.calcPrice()).equal(130.00)
        this.expectTally(2, 1, 0, 0)
    })

    it("should be accurate, when items scanned are: [A, A, A, B, B, C]", function(){
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newB())
        this.collection.addItem(CheckOutItemFactory.newB())
        this.collection.addItem(CheckOutItemFactory.newC())

        expect(this.collection.calcPrice()).equal(230.00)
        this.expectTally(3, 2, 1, 0)
    })

    it("should be accurate, when items scanned are: [A, A, A, A, B, B, B, C, C, D]", function(){
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newA())
        this.collection.addItem(CheckOutItemFactory.newB())
        this.collection.addItem(CheckOutItemFactory.newB())
        this.collection.addItem(CheckOutItemFactory.newB())
        this.collection.addItem(CheckOutItemFactory.newC())
        this.collection.addItem(CheckOutItemFactory.newC())
        this.collection.addItem(CheckOutItemFactory.newD())

        expect(this.collection.calcPrice()).equal(345.00)
        this.expectTally(4, 3, 2, 1)
    })

})