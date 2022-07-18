"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const DBConfig_1 = __importDefault(require("./configuration/DBConfig"));
const typeorm_1 = require("typeorm");
const routing_controllers_1 = require("routing-controllers");
const controller_1 = require("./controller");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
(0, typeorm_1.useContainer)(typeorm_typedi_extensions_1.Container);
(0, typeorm_1.createConnection)(DBConfig_1.default).then(() => {
    console.log("I am connected to the DB!!!");
    const app = (0, routing_controllers_1.createExpressServer)({
        controllers: [...controller_1.Controllers]
    });
    app.listen(8080, () => {
        console.log("The App is listening on port 8080.");
    });
});
//# sourceMappingURL=index.js.map