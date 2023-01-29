import { Sequelize } from 'sequelize';

const dbName = process.env.DB || 'nodesql';
const dbUser = process.env.DBUSER || 'gestor';
const dbPass = process.env.DBPASS || 'secreto';
//DB_Name ,user, pass ,{  host: 'localhost',  dialect: one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'  }
//Logging para pruebas se puede dejar en console.log para ver que hace realmente y despues en proc quitarse
const db = new Sequelize(dbName, dbUser, dbPass,
    {
        host: 'localhost',
        dialect: 'mariadb',
        logging: console.log
    }
);

export default db;