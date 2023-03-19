import express, { Application } from 'express';
import fileupload from 'express-fileupload';

import cors from 'cors';

import { userRoutes, authRoutes, categoryRoutes ,productRoutes, searchRoutes, uploadRoutes} from '../routes';
import db from '../database/connection';
import config from '../config/config';
import { User, Role, Category,Product } from './';

class Server {
    // private app:express.Application; si tan solo se importa express
    private app: Application;
    //Listado con las rutas de la aplicación
    private apiPaths = {
        auth: '/api/auth',
        search:      "/api/search",
        category: '/api/categories',
        products: '/api/products',
        users: '/api/users',
        uploads: '/api/uploads'
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

    async dbInit() {

        //Declaro las asociaciones 
        User.associate();
        Category.associate();
        Product.associate();

        //Sincronizamos con la base de datos
        db.sync();

        //Si tan solo queremos que nos cree las tablas y las borre
        // User.sync({force:true}); 
        // Category.sync({force:true});
        // Product.sync({force:true});

    }

    middlewares() {
        //CORS -- Habilitamos las peticiones cors, dejo cors({}) como ejemplo que permite muchas configs
        this.app.use(cors({}));

        //Lectura del body 
        this.app.use(express.json());

        //Carpeta publica
        this.app.use(express.static('public'));

        //Configuramos express-Fileuploads
        this.app.use(
            fileupload({
                useTempFiles:     true,
                tempFileDir:      "/tmp/",
                createParentPath: true,
            })
        );
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.search, searchRoutes);
        this.app.use(this.apiPaths.users, userRoutes);
        this.app.use(this.apiPaths.category, categoryRoutes);
        this.app.use(this.apiPaths.products, productRoutes);
        this.app.use(this.apiPaths.uploads, uploadRoutes);
    }

    listen(): void {
        this.app.listen(config.port, () => {
            console.log(`Server is running on ${config.port}`);
        });
    }

}

//Se exporta por defecto la clase Server al tener solo esta clase
export default Server;