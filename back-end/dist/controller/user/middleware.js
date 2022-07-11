"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
function loggingMiddleware(request, response, next) {
    console.log('do something...');
    next();
}
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=middleware.js.map