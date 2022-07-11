"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMiddleware = void 0;
class MyMiddleware {
    use(request, response, next) {
        console.log('do something 3...');
        next();
    }
}
exports.MyMiddleware = MyMiddleware;
//# sourceMappingURL=MyMiddelWare.js.map