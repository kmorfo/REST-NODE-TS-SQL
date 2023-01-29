import express, { Application } from 'express';
import cors from 'cors';

import userRoutes from '../routes/usuario';
import db from '../database/connection';

class Server {
    // private app:express.Application; si tan solo se importa express
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

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
        this.app.use(this.apiPaths.usuarios, userRoutes);
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}

//Se exporta por defecto la clase Server al tener solo esta clase
export default Server;