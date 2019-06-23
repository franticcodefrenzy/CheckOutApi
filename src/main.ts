'use strict'

import {CheckOut} from './Classes/CheckOut'


console.log('hello World')

const checkout = new CheckOut()
checkout.scan({name:"Beans"})
checkout.scan({name:"Meanz"})
checkout.scan({name:"Heinz"})

const price = checkout.total()

console.log("Checkout Total price: ", price)
