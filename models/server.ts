import express, { Application } from 'express';
import cors from 'cors';

import { userRoutes } from '../routes';
import db from '../database/connection';
import config from '../config/config';

class Server {
    // private app:express.Application; si tan solo se importa express
    private app: Application;
    private apiPaths = {
        users: '/api/users'
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
            console.log('DB Online');
        } catch (error: any) {
            throw new Error(error);
        }
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
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen(): void {
        this.app.listen(config.port, () => {
            console.log(`Server running on the port ${config.port}`);
        });
    }

}

//Se exporta por defecto la clase Server al tener solo esta clase
export default Server;