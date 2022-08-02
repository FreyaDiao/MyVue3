"use strict";
exports.__esModule = true;
exports.calc = void 0;
var calc = function (a, b, type) {
    switch (type) {
        case 'multiply':
            return a * b;
        case 'divide':
            return a / b;
        case 'minus':
            return a - b;
        default:
            return a + b;
    }
};
exports.calc = calc;
