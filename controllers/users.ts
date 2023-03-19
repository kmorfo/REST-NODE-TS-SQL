import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import { Error } from "sequelize";

import { User } from '../models';

const getUsers = async (req: Request, res: Response) => {

    try {
        const { max = 10, from = 0 } = req.query;
        const query = { state: true };
        const order = ['id'];

        //Se resolveran todas las promesas juntas filtrando los usuarios que esten activos
        const [users, totalUsers] = await Promise.all([
            User.findAll({ limit: Number(max), offset: Number(from), where: query, order: order }),
            User.count({ where: query })
        ]);

        res.status(200).json({
            total: totalUsers,
            users
        });
    } catch (error) {
        console.log(error);
        const { message } = error as Error;
        res.status(500).json({
            msg: 'Talk to the administrator',
            message
        })
    }

}

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            msg: `There is no user with the id ${id}`
        });
    }

    res.status(200).json(user);
}

const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        //Solo obtendremos del body los parametros que necesitamos, limitando posibles errores
        const { name, lastname, email, password, image, role } = body;

        //Creamos un nuevo usuario a partir de lo enviado en el body
        const user = await User.create({ name, lastname, email, password, image, role });

        //Ciframos la contraseña, en este caso se obtiene el hash
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(password, salt);

        user.password = hash;
        user.save();

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}

const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: idBody, password, google, email, ...rest } = req.body;

    try {
        //TODO: Con la autenticacion se comprobara desde ahi que la pass es valida
        //Se comprueba que la contraseña sea correcta
        // if (password && user) {
        //     if (await bcryptjs.compareSync(password, user.dataValues.password)){
        //         //Ciframos la contraseña, en este caso se obtiene el hash
        //         const salt = bcryptjs.genSaltSync();
        //         const hash = bcryptjs.hashSync(password, salt);
        //         user.password =hash;
        //     }else{
        //         return res.status(400).json({
        //             msg: `Current password is not valid`
        //         });
        //     }
        // }

        //TODO: Con la authenticacion se validara el email con el del user autenticado
        //Comprobamos que no existe un usuario con el mismo email antes de poder actualizarlo
        const existsEmail = await User.findOne({ where: { email } });
        if ((existsEmail && (existsEmail.dataValues.id as unknown as string)) != id) {
            return res.status(400).json({
                msg: `The email ${email} is already registered`
            });
        }

        //Actualizamos los datos del usu sario a partir de lo enviado en el body
        await User.update({ email, ...rest }, { where: { id: id } });//Devuelve el numero de columas afectadas
        const user = await User.findByPk(id);

        res.status(202).json(user);
    } catch (error) {
        console.log(error);
        const { message } = error as Error;
        res.status(500).json({
            msg: 'Talk to the administrator',
            message
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        //Para la eliminación utiliza la función destroy
        // await usuarioID.destroy();

        //Establecer el estado en false para respetar la integridad referencial si tuviera relaciones con otras tablas
        await User.update({ state: false }, { where: { id: id } });

        console.log(id);

        res.status(200).json({
            msg: `User with id ${id} was deleted`
        });
    } catch (error) {
        console.log(error);
        const { message } = error as Error;
        res.status(500).json({
            msg: 'Talk to the administrator',
            message
        })
    }
}

export { getUsers, getUser, postUser, putUser, deleteUser }