'use strict'

import {ICheckOut} from '../Interfaces/ICheckOut'


export class CheckOut implements ICheckOut {

    public constructor() {
    }


    public scan(Item:any):void {
    }

    
    public total():number {
        return 0
    }

}

