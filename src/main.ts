'use strict'

import {CheckOut} from './Classes/CheckOut'
import {CheckOutItemFactory} from './Classes/CheckOutItemFactory'


console.log("Starting checkout process...")

const checkout = new CheckOut()
checkout.scan(CheckOutItemFactory.newA())
checkout.scan(CheckOutItemFactory.newB())
checkout.scan(CheckOutItemFactory.newC())

const price = checkout.total()

console.log("Checkout Total price: ", price)
