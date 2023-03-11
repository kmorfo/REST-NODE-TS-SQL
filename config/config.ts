import dotenv from 'dotenv';

//Configuración de DotEnv
dotenv.config();

const { DB_HOST, PORT, DB, DBUSER, DBPASS } = process.env;

const config = {
    host    : DB_HOST|| '127.0.0.1',
    port    : PORT   || '8432',
    database: DB     || 'nodesql',
    username: DBUSER || 'gestor',
    password: DBPASS || 'secreto'
}

export default config;