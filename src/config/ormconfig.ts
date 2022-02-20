import { ConnectionOptions } from 'typeorm';

const {DB_HOST,DB_PORT,DB_USER,DB_PASSWORD,ENV,DB} = process.env;
const config: ConnectionOptions = {
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: ENV==='test' ? `${DB}_test`:DB,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations:[ __dirname + '/../migrations/*'],
    cli: {
        migrationsDir: 'src/migrations',
    },
    synchronize: true,
};

export default config;