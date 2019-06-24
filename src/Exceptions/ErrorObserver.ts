'use strict'

import {IErrorObserver} from '../Interfaces/IErrorObserver'

/**
 * @class ErrorObserver - Implements interface to allow caller error observation
 * This is a very simple implemetation, but could be expanded
 */
export class ErrorObserver implements IErrorObserver {

    public constructor(readonly keepRunning:boolean) {
    }


    public handleError(error:any):void {
        console.error("\t>>> Error Observered: ", error.message)

        if (this.keepRunning == false) {
            throw error
        }
    }

}
