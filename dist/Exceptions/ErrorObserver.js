'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorObserver = /** @class */ (function () {
    function ErrorObserver(keepRunning) {
        this.keepRunning = keepRunning;
    }
    ErrorObserver.prototype.handleError = function (error) {
        console.error("\t>>> Error Observered: ", error.message);
        if (this.keepRunning == false) {
            throw error;
        }
    };
    return ErrorObserver;
}());
exports.ErrorObserver = ErrorObserver;
