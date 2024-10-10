"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    database: {
        type: process.env.DB_TYPE || 'postgres',
        url: process.env.POSTGRES_URL || 'POSTGRES_URL',
        host: process.env.DB_HOST || 'POSTGRES_HOST',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        username: process.env.DB_USER || 'POSTGRES_USER',
        password: process.env.DB_PASS || 'POSTGRES_PASSWORD',
        database: process.env.DB_NAME || 'POSTGRES_DATABASE',
        synchronize: process.env.DB_SYNC === 'true',
        autoLoadEntities: process.env.DB_AUTOLOAD_ENTITIES === 'true',
        logging: false,
        ssl: { rejectUnauthorized: false },
    },
});
//# sourceMappingURL=config.js.map