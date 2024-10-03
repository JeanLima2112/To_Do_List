export default () => ({
  database: {
    type: (process.env.DB_TYPE as 'postgres') || 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER || 'DB_USER',
    password: process.env.DB_PASS || 'DB_PASS',
    database: process.env.DB_NAME || 'DB_NAME',
    synchronize: process.env.DB_SYNC === 'true',
    autoLoadEntities: process.env.DB_AUTOLOAD_ENTITIES === 'true',
    logging: false,
  },
});
