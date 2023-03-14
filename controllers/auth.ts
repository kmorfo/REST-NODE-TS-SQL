import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';


import { User } from "../models";
import { generateJWT } from "../helpers";


export const login = async (req: Request, res: Response) => {
    //Extraemos los datos del body que nos envio el usuario
    const { email, password } = req.body;

    try {
        //Obtenemos el usuario a partir del email para realizar las comprobaciones
        const user = await User.findOne({ where: { email } });

        //TODO: Las respuestas con errores se tendran que corregir para no dar pistas al usuario de cual es el error y cuentas activas
        //Verificar si el email existe
        if (!user)
            return res
                .status(401)
                .json({ msg: "User/Pass not valid - email" });

        //Si el usuario está activo
        if (!user.dataValues.state)
            return res
                .status(401)
                .json({ msg: "Usuario/Pass not valid - status:false" });

        //Verificar la contraseña
        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if (!isValidPassword)
            return res
                .status(401)
                .json({ msg: "Usuario/Pass not valid - pass" });

        //Generar el JWT
        const token = await generateJWT(user.id.toString());

        req.userAuth = user;

        res.status(200).json({ msg: 'Login ok', user, token });
    } catch (error) {
        console.log(error);
        const { message } = error as Error;
        res.status(500).json({
            msg: 'Talk to the administrator',
            message
        })
    }
}

//Renovar el Token
export const renewToken = async (req: Request, res: Response) => {
         try {
            const userAuth = req.userAuth;
    
            //Generamos un nuevo JWT a partir del UID del usuario
            const token = await generateJWT(userAuth.id);
    
            // console.log("Obtenidos los datos del usuario", usuarioAuth.email);
    
            res.status(200).json({
                userAuth,
                token,
            });
        } catch (error) {
            console.log(error);
            const { message } = error as Error;
            res.status(500).json({
                msg: 'Talk to the administrator',
                message
            })
        }
};