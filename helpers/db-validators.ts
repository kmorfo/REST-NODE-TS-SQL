import { User, Role } from "../models";


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
    if (!user || !user.dataValues.state) throw new Error(`The ID ${id} does not exist`);
};

