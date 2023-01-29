import { Request, Response } from "express";
import Usuario from '../models/usuario';


export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();

    res.json({
        usuarios
    });
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }

    res.json(usuario);
}

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        //Comprobamos que no existe un usuario con el mismo email
        const existeEmail = await Usuario.findOne({ where: { email: body.email } });
        if (existeEmail) {
            return res.status(400).json({
                msg: `El email ${body.email} ya se encuentra registrado`
            });
        }

        //Creamos un nuevo usuario a partir de lo enviado en el body
        const usuario = await Usuario.create(body);

        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        //Comprobamos que existe el id del usuario a actualizar
        const usuarioID = await Usuario.findByPk(id);
        if (!usuarioID) {
            return res.status(400).json({
                msg: `El id ${id} no existe`
            });
        }

        //Comprobamos que no existe un usuario con el mismo email
        const existeEmail = await Usuario.findOne({ where: { email: body.email } });
        if (existeEmail && existeEmail.dataValues.id != id) {
            return res.status(400).json({
                msg: `El email ${body.email} ya se encuentra registrado`
            });
        }

        //Actualizamos los datos del usuario a partir de lo enviado en el body
        await Usuario.update(body, { where: { id: id } });//Devuelve el numero de columas afectadas
        const usuario = await Usuario.findByPk(id);

        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;

    //Comprobamos que existe el id del usuario a actualizar
    const usuarioID = await Usuario.findByPk(id);
    if (!usuarioID) {
        return res.status(400).json({
            msg: `El id ${id} no existe`
        });
    }

    //Eliminacion del usuario
    // await usuarioID.destroy();

    //Establecer el estado en false para respetar la integridad referencial si tuviera relaciones con otras tablas
    await Usuario.update({ estado: 0 }, { where: { id: id } });

    res.json({
        msg: `El usuario con id ${id} fue borrado`
    });
}