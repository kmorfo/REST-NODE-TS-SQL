import express, { Application } from 'express';
import cors from 'cors';

import { userRoutes,authRoutes } from '../routes';
import db from '../database/connection';
import config from '../config/config';
import {User,Role} from './';
import { Request } from 'express';

class Server {
    // private app:express.Application; si tan solo se importa express
    private app: Application;
    //Listado con las rutas de la aplicación
    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth'
    }

    constructor() {
        this.app = express();

        //Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();

            //Establecemos parametros iniciales de la base de datos
            //Se quitara al tener la aplicación completa, tan solo para que cree las tablas sincronizado
            this.dbInit();
            console.log('DB Online');
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async dbInit(){
        //This creates the table,∫ dropping it first if it already existed 
        // User.sync({ force: true });
        // Role.sync({ force: true });

    }

    middlewares() {
        //CORS -- Habilitamos las peticiones cors, dejo cors({}) como ejemplo que permite muchas configs
        this.app.use(cors({}));

        //Lectura del body 
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen(): void {
        this.app.listen(config.port, () => {
            console.log(`Server is running on ${config.port}`);
        });
    }

}

//Se exporta por defecto la clase Server al tener solo esta clase
export default Server;