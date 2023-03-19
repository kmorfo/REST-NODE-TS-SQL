import { User, Role, Product, Category } from "../models";


export const isValidRole = async (userRole: string) => {
    const existRole = await Role.findOne({ where: { name: userRole } });
    if (!existRole) throw new Error(`You must enter a valid role! ${userRole} is not valid`);
}

export const existEmail = async (email: string) => {
    //Verificar si el correo ya existe
    const userEmail = await User.findOne({ where: { email: email } });
    if (userEmail)
        throw new Error(`The email ${email} is already registered`);
};

export const existUserID = async (id: number) => {
    const user = await User.findByPk(id);
    //Ademas de comprobar si existe se comprueba que el usuario este activo
    if (!user || !user.dataValues.state) throw new Error(`The ID ${id} does not exist`);
};

export const existCategoryID = async (id: number) => {
    const category = await Category.findByPk(id);
    //Ademas de comprobar si existe se comprueba que la category este activo
    if (!category || !category.dataValues.state) throw new Error(`The ID ${id} does not exist`);
};

export const existProductID = async (id: number) => {
    const product = await Product.findByPk(id);
    //Ademas de comprobar si existe se comprueba que el producto este activo
    if (!product || !product.dataValues.state) throw new Error(`The ID ${id} does not exist`);
};

export const collectionAllowed = (collection: string, collections: String[]): boolean => {

    if (!collections.includes(collection))
        throw new Error(
            `The collection ${collection} is not allowed or does not exist - ${collections}`
        );

    return true;
};