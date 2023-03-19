import { Request, Response } from "express";

import { Error, Op } from "sequelize";
import { Product, Category, User } from "../models";

const collectionsAllowed = ["users", "products", "categories", "roles"];

const searchUsers = async (term: string, res: Response) => {
    term = term.toUpperCase();

    try {
        const { count, rows } = await User.findAndCountAll({
            where: {
                name: { [Op.like]: `%${term}%` },
                state: true,
            },
            limit: 10
        });

        res.status(200).json({ "Total": count, "Users": rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Talk to the administrator' });
    }
};

const searchProducts = async (term: string, res: Response) => {
    term = term.toUpperCase();

    try {
        const { count, rows } = await Product.findAndCountAll({
            where: {
                name: { [Op.like]: `%${term}%` },
                state: true,
            },
            limit: 10
        });

        res.status(200).json({ "Total": count, "Products": rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Talk to the administrator' });
    }

};

const searchCategories = async (term: string, res: Response) => {
    term = term.toUpperCase();

    try {
        const { count, rows } = await Category.findAndCountAll({
            where: {
                name: { [Op.like]: `%${term}%` },
                state: true,
            },
            limit: 10
        });

        res.status(200).json({ "Total": count, "Categories": rows });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Talk to the administrator' });
    }
};



export const search = async (req: Request, res: Response) => {

    const { collection, term } = req.params;

    //Comprobamos que la coleccion requerida por el usuario es permitida
    if (!collectionsAllowed.includes(collection))
        return res.status(400).json({
            msg: `The allowed collections are ${collectionsAllowed}`,
        });

    switch (collection) {
        case "users":
            searchUsers(term, res);
            break;
        case "products":
            searchProducts(term, res);
            break;
        case "categories":
            searchCategories(term, res);
            break;
        default:
            return res.status(500).json({
                msg: `Collection not included in the searches`

            });
    }
}