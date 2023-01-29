import dotenv from 'dotenv';
import Server from './models/server';

//Configuración de DotEnv
dotenv.config();

const server = new Server();

server.listen();