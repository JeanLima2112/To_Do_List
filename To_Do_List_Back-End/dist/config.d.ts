declare const _default: () => {
    database: {
        type: "postgres";
        url: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        autoLoadEntities: boolean;
        logging: boolean;
        ssl: {
            rejectUnauthorized: boolean;
        };
    };
};
export default _default;
