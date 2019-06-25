# Gelato Technial Test - 

The test was implemented using Node JS with TypeScript.

This means that the source code is written in TypeScript.ts files and compiled to .js files for node to run.

## Prerequisites

This requires node, npm and the following npm modules to run:

* typescript

In order to run the tests, the following npm modules are needed:

* mocha, chai, ts-node

In order for typescript to compile the types, the following npm modules are needed

* @types/mocha, @types/chai

## Directory Structure

* tests/          holds all the Mocha tests
* dist/           holds the compiled JavaScript code
* src/            holds all typescript source files
* src/Collections holds all classes which collect sets of objects
* src/Controllers holds the primary CheckOut class
* src/Exceptions  holds specific errors and an error observer
* src/Factories   holds quick ways to generate pre-set items and discounts
* src/Interfaces  holds all the interfaces in one-place, to make it easier to view
* src/Models      holds implementations of what are typically single-entity model-like objects

## How to run

Assuming the Prerequisites are installed (see Dockerfile), the following are the main commands:

### To compile the TypeScript to JavaScript 
(reload dist/ which should not be neeed unless src changed):
```
tsc -w
```

### Run Tests
```
npm test
```

### Run Sample Scenarios
```
node dist/scenarios.js
```

## Solution Taken

The solution was thought out in advance to a basic level, listing key classes, their interface and how they interact.
It was then bult iteratively and committed to show this, at key stages, building it up from the key CheckOut interface,
filling out further required elements in later stages. At each stage, unit tests were created to cover the components built
at that stage and no more.

Each commit bult upon the previous stage and often filled out templates and placeholders or slowly passed failing holding tests.

### Design

Every class has an interface, which is used wherever possible for reference, to keep things writing to the interface. 

Essentially, all scanned items implement ICheckOutItem and these are held in a specific CheckOutItemCollection. This should allow
special-case items to by operated in the same as normal items.

Discounts all implement IDiscount and the decision was made to require them to be supplied a collection of items, in order to 
work out if their discount logic applies. Discount implementations are almost portable functions for the discoutn logic, but 
later their own validation was added. It may be possible to devise a way to keep discounts independant of item collections even further,
but this seemed fairly workable.

The main CheckOut class uses underlying collection classe specific to heckout items and discounts, so it does very little of the
implementation itself, allowing either of these to be swapped out, without change to its own or caller logic.

The discount calculation is performed at the point the total is requested (not as we scan items), so we can get the full view of how manyn of #
each SKU we have.

The list of discounts are filtered out for ones that will obviosuly not apply (totals > checkout total or number items > those scanned) 
and then the remaining discounts are passed the item collection where they accessed quick summarised stats for the whole collections,
to see what discount they offer.

Multiple discounts have been allowed and they each operate off the original checkout total. This could be tailored with some further tweaking.

#### How would this scale out?

Some ideas of the different ways this could scale out:

* More discount types - the strcuture for more specialised discounts is in-place and should work ok. Offers requireing more complex
information, mayb strain the system to provide more data than i currently does.
* More checkout item types - the structure for this should be in-place to allow for customisations and even for special items that
only special discounts apply to (e.g. adding more properties)
* More checkout item data - adding data beyond SKU and UnitPrice may require more careful thinking about. We may not want to repeat
the same information for every item of the same type and so look to implement a system where we store common data in one object
and only scan references to those objects (rather than full copies of the objects)
* Handling many more checkouts - it is imagined that this code would be instatiated once-per-checkout. So, much in the same way that
a web server creates an instance of website code per-request, this self-contined API should work the same way. 
However, currently all scanned item and discount data is wrapped up in the instance. If scaling out this API, this data would need
to be loaded from an external data-source or accessed via an API to an AWS system.
* Scaling out to multiple currencies could prove an interestin challenge. It may require UnitPrice to be divorced from CheckOutItems
or instead we devise a currency converter thst applesi during checkout.

#### How would it deal with 1000's of price rules?

Despite the fact that dscounts are applied by iterating over each one and passing in the final collection of checked out items,
various optimisations were done to reduce this becoming too unscalable:

* certain properties of discounts were made visible (total threshod, number items types threshold), so that pre-filtering
can be applied to cull any discounts that would never apply. This allows the list to be filtered quickly with basic 
property checking, instead of each one having its getDiscount() method called
* discounts for total price, only operate on a single total price, depsite passing in an item collection. The item collection
caches this under-the-hood. So it will only be calculated the first time it is called
* discounts for X items of a type - only operate on a summary tally structure, that is build as items are scanned.
* In short - each discount using summary stats from the item collection - they dont need to iterate over very canned item.

If it was determined that this was still too slow or innefficeint for 1000s of rules, other ideas could be:

* split rules into set and have each set handled by a separate thread
* refactor the discount collection to internally refer an API to do the perfooamcne intensive calculations. 
For example: have DiscountCollection.applyDiscounts() actually call an AWS API to do this on a more powerful machine.


#### How do you make this fault tolerant?

CheckOutItems and Discounts objects have validate methods which are implemented by specific implementations. 
These are called by their collections at the point they are added. By default, an error will be thrown and the transaction aborted.
An errorObserver can be passed to mark that errors shuld be notified by pocessing should cotinue in the event of bad data.

Further error validation could be added around discount generation, to ensure that only sensible discoutns are generated 
(e.g. discount < price)


### how do you ake this operation friendly?

The structure should be quite modular and hopefully the naming make it acceptabel to understand which parts of the system do what.
Creating new discounts or specific checkout items should be understandle and easy to achieve.
As most things are referenced by interfaces, the whole system should be somewhat extenadable without having to modify existing classes.

An Error Observer was created to allow users to capture errors generated deep in the checkout process.


## Ouputs

The outputs of running the tests and the sample scenarios, have been provided here, in the event the code does not run properly on the testers machine:


### Unit Test Output:
```
$ npm test

> gelato@1.0.0 test C:\Users\toby\Documents\Projects\Playtime\Node\Gelato
> mocha -r ts-node/register tests/**/*.spec.ts

  CheckOut total should match items scanned, with no pricing rules
    √ should return 0, when no items scanned
    √ should return 50, when items scanned are: [A]
    √ should return 30, when items scanned are: [B]
    √ should return 20, when items scanned are: [C]
    √ should return 15, when items scanned are: [D]
    √ should return 80, when items scanned are: [A, B]
    √ should return 80, when items scanned are: [A, A]
    √ should return 80, when items scanned are: [A, A, A]
    √ should return 80, when items scanned are: [C, D, B, A]

  CheckOut total should match items scanned, with pricing rules: [3xA for 130, 2xB for 45]
    √ should return 80, when items scanned are: [A, B]
    √ should return 80, when items scanned are: [A, A]
    √ should return 80, when items scanned are: [A, A, A]
    √ should return 80, when items scanned are: [C, D, B, A]

  CheckOut total should match items scanned, with pricing rules: [10% off 200 total]
    √ should return 200.00, when items scanned are: [A, A, A, A]
    √ should return 225.00, when items scanned are: [A, A, A, A, A]
    √ should return 234.00, when items scanned are: [A, A, A, A, B, B]

  ErrorObserver picks up errors generated from bad items or discounts
        >>> Error Observered:  CheckOutItemError: The SKU Is Not Valid
    √ alerts error for bad checkout item that has no sku
        >>> Error Observered:  CheckOutItemError: The Unit Price is Not Valid
    √ alerts error for bad checkout item that has invalid unit price
        >>> Error Observered:  CheckOutItemError: The SKU Is Not Valid
        >>> Error Observered:  CheckOutItemError: The Unit Price is Not Valid
    √ skips bad checkout items, without throwing an exception
        >>> Error Observered:  DiscountError: The SKU Is Not Valid
    √ alerts error for discount with no sku
        >>> Error Observered:  DiscountError: The Total Price Threshold is Not Valid
    √ alerts error for discount with bad total
        >>> Error Observered:  DiscountError: The SKU Is Not Valid
        >>> Error Observered:  DiscountError: The Total Price Threshold is Not Valid
        >>> Error Observered:  CheckOutItemError: The SKU Is Not Valid
        >>> Error Observered:  CheckOutItemError: The Unit Price is Not Valid
    √ skips bad items and discounts and carries on

  CheckOutItem should remember the properties it is created with
    √ Item A should be 50.00
    √ Item B should be 30.00
    √ Item C should be 20.00
    √ Item D should be 15.00

  CheckOutItemCollection, with no pricing rules, should store, tally and price items stored
    √ should be accurate, when no items scanned
    √ should be accurate, when items scanned are: [A]
    √ should be accurate, when items scanned are: [B]
    √ should be accurate, when items scanned are: [C]
    √ should be accurate, when items scanned are: [D]
    √ should be accurate, when items scanned are: [A, A]
    √ should be accurate, when items scanned are: [A, A, A]
    √ should be accurate, when items scanned are: [A, A, B]
    √ should be accurate, when items scanned are: [A, A, A, B, B, C]
    √ should be accurate, when items scanned are: [A, A, A, A, B, B, B, C, C, D]

  When offers applied the total discount should reflect them
    √ should have 0 discount when no discounts added
    √ should have 50.00 discount
    √ should have 15.00 discount
    √ should have 12.00 discount
    √ should have 0 discount, when no discounts apply

  Item Quantity Fixed Discount applies correcly
    √ discounts 50.00 for 5, from 3x50.00, should be 0.00
    √ discounts 50.00 for 5, from 5x50.00, should be 50.00
    √ discounts 15.00 for 5, from 10x10.00, should be 15.00

  Item Quantity Percent Discount applies correcly
    √ discounts 10% for 3, from 3x50.00 should be 15.00
    √ discounts 10% for 4, from 3x50.00 should be 0.00
    √ discounts 25% for 5 from 10x10.00 should be 12.50

  Total Fixed Discount applies correcly
    √ discounts 12.00 off 60.00, from 50.00 total should be 0.00
    √ discounts 12.00 off 60.00, from 70.00 total should be 12.00
    √ discounts 50 off 300.00, from 350.00 total, should be 300.00

  Total Percent Discount applies correcly
    √ discounts 10% from 50.00 should be 5.00
    √ discounts 25% from 200.00 should be 50.00
    √ discounts 15% from 60.00 should be 9.00


  53 passing (26ms)

```


### Run sample scenarios
```
$ node dist/scenarios.js

Starting checkout process. Items:  [ 'A', 'B' ]  Offers:  [] ...
Checkout Total price:  80
(No offers loaded)

Starting checkout process. Items:  [ 'A', 'A' ]  Offers:  [] ...
Checkout Total price:  100
(No offers loaded)

Starting checkout process. Items:  [ 'A', 'A', 'A' ]  Offers:  [] ...
Checkout Total price:  150
(No offers loaded)

Starting checkout process. Items:  [ 'C', 'D', 'B', 'A' ]  Offers:  [] ...
Checkout Total price:  115
(No offers loaded)

Starting checkout process. Items:  [ 'A', 'B' ]  Offers:  [ 'fixedTwentyOffThreeAs', 'fixedFifteenOffTwoBs' ] ...
Checkout Total price:  80
(No offers applied)

Starting checkout process. Items:  [ 'B', 'B' ]  Offers:  [ 'fixedTwentyOffThreeAs', 'fixedFifteenOffTwoBs' ] ...
Checkout Total price:  45
**Offer applied:  Total Fixed Discount: 15

Starting checkout process. Items:  [ 'A', 'A' ]  Offers:  [ 'fixedTwentyOffThreeAs', 'fixedFifteenOffTwoBs' ] ...
Checkout Total price:  100
(No offers applied)

Starting checkout process. Items:  [ 'A', 'A', 'A' ]  Offers:  [ 'fixedTwentyOffThreeAs', 'fixedFifteenOffTwoBs' ] ...
Checkout Total price:  130
**Offer applied:  Total Fixed Discount: 20

Starting checkout process. Items:  [ 'C', 'D', 'B', 'A' ]  Offers:  [ 'fixedTwentyOffThreeAs', 'fixedFifteenOffTwoBs' ] ...
Checkout Total price:  115
(No offers applied)

Starting checkout process. Items:  [ 'A', 'A', 'A', 'A' ]  Offers:  [ 'tenPercentOffOverTwoHundred' ] ...
Checkout Total price:  200
(No offers applied)

Starting checkout process. Items:  [ 'A', 'A', 'A', 'A', 'A' ]  Offers:  [ 'tenPercentOffOverTwoHundred' ] ...
Checkout Total price:  225
**Offer applied:  Total Percent Discount: 25

Starting checkout process. Items:  [ 'B', 'B' ]  Offers:  [ 'twentyPercentOffTwoBs' ] ...
Checkout Total price:  48
**Offer applied:  Total Percent Discount: 12

Starting checkout process. Items:  [ 'B', 'B', 'B' ]  Offers:  [ 'twentyPercentOffTwoBs' ] ...
Checkout Total price:  78
**Offer applied:  Total Percent Discount: 12

Starting checkout process. Items:  [ 'B', 'B' ]  Offers:  [ 'fixedTwentyOffThreeAs',
  'twentyPercentOffTwoBs',
  'fixedFiftyOffOverThreeHundred' ] ...
Checkout Total price:  48
**Offer applied:  Total Percent Discount: 12

Starting checkout process. Items:  [ 'A', 'A', 'A', 'B', 'B' ]  Offers:  [ 'fixedTwentyOffThreeAs',
  'twentyPercentOffTwoBs',
  'fixedFiftyOffOverThreeHundred' ] ...
Checkout Total price:  178
**Offer applied:  Total Fixed Discount: 20
**Offer applied:  Total Percent Discount: 12

Starting checkout process. Items:  [ 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B' ]  Offers:  [ 'fixedTwentyOffThreeAs',
  'twentyPercentOffTwoBs',
  'fixedFiftyOffOverThreeHundred' ] ...
Checkout Total price:  278
**Offer applied:  Total Fixed Discount: 20
**Offer applied:  Total Percent Discount: 12
**Offer applied:  Total Fixed Discount: 50

Starting checkout process. Items:  [ 'A', 'B', 'BAD' ]  Offers:  [ 'fixedTwentyOffThreeAs', 'fixedFifteenOffTwoBs' ] ...
        >>> Error Observered:  CheckOutItemError: The Unit Price is Not Valid
Checkout Total price:  80
(No offers applied)
        >>> Error Observered:  DiscountError: The Total Price Threshold is Not Valid

Starting checkout process. Items:  [ 'B', 'B' ]  Offers:  [ 'BAD', 'fixedTwentyOffThreeAs', 'fixedFifteenOffTwoBs' ] ...
Checkout Total price:  45
**Offer applied:  Total Fixed Discount: 15
        >>> Error Observered:  DiscountError: The Total Price Threshold is Not Valid

Starting checkout process. Items:  [ 'A', 'A', 'BAD' ]  Offers:  [ 'BAD', 'fixedTwentyOffThreeAs', 'fixedFifteenOffTwoBs' ] ...
        >>> Error Observered:  CheckOutItemError: The Unit Price is Not Valid
Checkout Total price:  100
(No offers applied)

```
