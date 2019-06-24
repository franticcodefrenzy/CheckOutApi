'use strict'

export interface IErrorObserver {

    readonly keepRunning:boolean

    handleError(error):void

}
