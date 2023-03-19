import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';


import { User } from "../models";
import { generateJWT, googleVerify } from "../helpers";


export const login = async (req: Request , res: Response) => {
    //Extraemos los datos del body que nos envio el usuario
    const { email, password } = req.body;

    try {
        //Obtenemos el usuario a partir del email para realizar las comprobaciones
        const user:User|null = await User.findOne({ where: { email } });

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

        // req.userAuth = user;
        req.userAuth = new User();

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


export const googleSignIn = async (req: Request, res: Response) => {
    const { id_token } = req.body;

    try {
        //Comprobamos el token y obtenemos los datos del mismo
        const { name,given_name,family_name, img, email  }  = await googleVerify(id_token);
        
        let user = await User.findOne({ where: { email } });
        
        //Si el usuario no existe lo creamos en la BD
        if (!user) {
            const data = {
                name:given_name!,
                lastname:family_name!,
                email:email!,
                password: ":P",
                image:img!,
                google: true,
                role: "USER",
            };
            user = await User.create({ ...data });
        }
        //Si el usuario ya existe podriamos querer actualizar los datos necesarios

        //Si el usuario tiene un estado en la BD en false se deniega el acceso
        if (!user.dataValues.state)
            return res
                .status(401)
                .json({ msg: "Talk to administrator, user blocked" });

        //Generamos un JWT propio
        const token = await generateJWT(user.id.toString());

        res.json({ user, token });
    } catch (error) {
        res.status(400).json({
            msg: "The token could not be verified",
        });
    }
};


//Renovar el Token
export const renewToken = async (req: Request, res: Response) => {
    try {
        const userAuth = req.userAuth;
     
        //Generamos un nuevo JWT a partir del UID del usuario
        const token = await generateJWT(userAuth!.id as unknown as string);

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
