declare const _default: () => {
    database: {
        type: "postgres";
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        autoLoadEntities: boolean;
        logging: boolean;
    };
};
export default _default;
