import { Request, Response } from "express";

import { Error } from "sequelize";
import { Product, Category, User } from "../models";

const getProducts = async (req: Request, res: Response) => {
/*     try {
        const { max = 10, from = 0 } = req.query;
        const query = { state: true };
        const order = ['id'];

        //Se resolveran todas las promesas juntas filtrando los usuarios que esten activos
        const [categories, totalCategories] = await Promise.all([
            Category.findAll({ limit: Number(max), offset: Number(from), where: query, order: order }),
            Category.count({ where: query })
        ]);

        res.status(200).json({
            total: totalCategories,
            categories
        });
    } catch (error) {
        console.log(error);
        const { message } = error as Error;
        res.status(500).json({
            msg: 'Talk to the administrator',
            message
        })
    } */
    res.status(200).json({"msg":"getProducts"});
}

const getProduct = async (req: Request, res: Response) => {
     const { id } = req.params;
/*
    const category = await Category.findByPk(id);

    if (!category) {
        return res.status(404).json({
            msg: `There is no category with the id ${id}`
        });
    }

    res.status(200).json(category); */
    res.status(200).json({"msg":`getProduct ${id}`});
}

const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        res.status(200).json({"msg":"postProducts"});
/*         //Solo obtendremos del body los parametros que necesitamos, limitando posibles errores
        let { name } = body;
        name = name.toUpperCase()

        //Obtenemos los datos del usuario autenticado para crear la categoria asignada a este
        const user = await User.findByPk(req.userAuth.id);
        if (!user) return res.status(400).json({ msg: `User not found.` });

        //Comprobamos que no existe una categoria con ese nombre ya que es unico
        const categoryExist = await Category.findOne({ where: { name } });

        if (categoryExist)
            return res.status(400).json({
                msg: `There is already a category with the name ${name}`
            });

        const category = await user.createCategory({ name: name });

        res.status(201).json({
            category,
            username: user.name,
            userId: user.id
        }); */
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Talk to the administrator' });
    }
}

const putProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    //Solo obtendremos del body los parametros que necesitamos, limitando posibles errores
    let { name } = req.body;
    name = name.toUpperCase()
    res.status(200).json({"msg":"putProduct"});

/*     try {
        //Comprobamos que no existe una categoria con ese nombre ya que es unico
        const categoryExist = await Category.findOne({ where: { name } });

        if (categoryExist)
            return res.status(400).json({ msg: `There is already a category with the name ${name}` });

        await Category.update({ name }, { where: { id } });

        res.status(201).json({ msg: `The category ${name} has been updated` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Talk to the administrator' });
    } */
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

/*     try {
        const category = await Category.findByPk(id);

        if (!category)
            return res.status(400).json({
                msg: `Category not found.`
            });

        category.state = false;
        category.save();

        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    } */
    res.status(200).json({"msg":"deleteProduct"});
}

export { getProduct, getProducts, postProduct, putProduct, deleteProduct };
