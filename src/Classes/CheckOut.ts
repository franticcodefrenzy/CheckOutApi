'use strict'

import {ICheckOut} from '../Interfaces/ICheckOut'
import {ICheckOutItem} from '../Interfaces/ICheckOutItem'


export class CheckOut implements ICheckOut {

    public constructor() {
    }


    public scan(item:ICheckOutItem):void {
    }

    
    public total():number {
        return 0
    }

}

