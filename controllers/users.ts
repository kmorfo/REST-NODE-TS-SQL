import { Request, Response } from "express";
import { User } from '../models';


const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll();

    res.json({
        users
    });
}

const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({
            msg: `There is no user with the id ${id}`
        });
    }

    res.json(user);
}

const postUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        //Comprobamos que no existe un usuario con el mismo email
        const existsEmail = await User.findOne({ where: { email: body.email } });
        if (existsEmail) {
            return res.status(400).json({
                msg: `The email ${body.email} is already registered`
            });
        }

        //Creamos un nuevo usuario a partir de lo enviado en el body
        const user = await User.create(body);

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}

const putUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        //Comprobamos que existe el id del usuario a actualizar
        const userID = await User.findByPk(id);
        if (!userID) {
            return res.status(400).json({
                msg: `The id ${id} does not exist`
            });
        }

        //Comprobamos que no existe un usuario con el mismo email
        const existsEmail = await User.findOne({ where: { email: body.email } });
        if (existsEmail && existsEmail.dataValues.id != id) {
            return res.status(400).json({
                msg: `The email ${body.email} is already registered`
            });
        }

        //Actualizamos los datos del usuario a partir de lo enviado en el body
        await User.update(body, { where: { id: id } });//Devuelve el numero de columas afectadas
        const user = await User.findByPk(id);

        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    //Comprobamos que existe el id del usuario a actualizar
    const userID = await User.findByPk(id);
    if (!userID) {
        return res.status(400).json({
            msg: `El id ${id} no existe`
        });
    }

    //Eliminacion del usuario
    // await usuarioID.destroy();

    //Establecer el estado en false para respetar la integridad referencial si tuviera relaciones con otras tablas
    await User.update({ status: 0 }, { where: { id: id } });

    res.json({
        msg: `User with id ${id} was deleted`
    });
}

export { getUsers, getUser, postUser, putUser, deleteUser }