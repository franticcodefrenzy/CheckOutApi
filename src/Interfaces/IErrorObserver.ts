'use strict'

/**
 * @interface IErrorObserver - useful to pass around to other classes, so they are not aware of any implementations
 */
export interface IErrorObserver {

    readonly keepRunning:boolean

    handleError(error):void

}
