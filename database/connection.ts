import { Sequelize } from 'sequelize';
import config from '../config/config';


const dbName  : string = config.database;
const dbUser  : string = config.username;
const dbPass  : string = config.password;
const dbserver: string = config.host    ;

//DB_Name ,user, pass ,{  host: 'localhost',  dialect: one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'  }
//Logging para pruebas se puede dejar en console.log para ver que hace realmente y despues en proc quitarse
const db = new Sequelize(dbName!, dbUser, dbPass,
    {
        host: dbserver,
        dialect: 'postgres',
        logging: console.log
    }
);

export default db;