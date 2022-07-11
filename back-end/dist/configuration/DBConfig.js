"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../domain/entities");
const config = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DB || "postgres",
    entities: [...entities_1.Entities],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=DBConfig.js.map