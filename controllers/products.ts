import { Request, Response } from "express";

import { Error, Op } from "sequelize";
import { Product, Category, User } from "../models";


const getProducts = async (req: Request, res: Response) => {
    try {
        const { max = 10, from = 0 } = req.query;
        const query = { state: true };
        const order = ['id'];

        //Se resolveran todas las promesas juntas filtrando los productos que esten activos
        const [products, totalProducts] = await Promise.all([
            Product.findAll({ limit: Number(max), offset: Number(from), where: query, order: order }),
            Product.count({ where: query })
        ]);

        res.status(200).json({
            total: totalProducts,
            products
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

const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    res.status(200).json(product);
}


const postProduct = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        //Solo obtendremos del body los parametros que necesitamos, limitando posibles errores
        let { name, description, price, categoryId } = body;
        name = name.toUpperCase()

        //Obtenemos los datos del usuario autenticado para crear el producto asignada a este
        const user = await User.findByPk(req.userAuth!.id);
        if (!user) return res.status(400).json({ msg: `User not found.` });

        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(400).json({ msg: `Category not found.` });

        //Comprobamos que no existe un producto con ese nombre ya que es unico
        const productExist = await Product.findOne({ where: { name } });

        if (productExist)
            return res.status(400).json({
                msg: `There is already a produtc with the name ${name}`
            });

        const UserId = user.id;
        const CategoryId = category.id;
        // const product = Product.create({ name, price, description, UserId, CategoryId });
        const product = await category.createProduct({ name, price, description, UserId });

        res.status(201).json({
            product,
            username: user.name,
            category: category.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Talk to the administrator' });
    }
}

const putProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    //Solo obtendremos del body los parametros que necesitamos, limitando posibles errores
    let { name, description, price } = req.body;
    name = name.toUpperCase()

    try {
        await Product.update({ name, description, price }, { where: { id } });

        res.status(201).json({ msg: `The product ${name} has been updated` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Talk to the administrator' });
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);

        if (!product)
            return res.status(400).json({
                msg: `Product not found.`
            });

        product.state = false;
        product.save();

        res.status(201).json({ "msg": `Product with id ${id} was deleted` });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }

}

export { getProduct, getProducts, postProduct, putProduct, deleteProduct };
