'use strict'

import {IErrorObserver} from '../Interfaces/IErrorObserver'


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
