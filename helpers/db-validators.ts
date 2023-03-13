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
    if (!user) throw new Error(`The ID ${id} does not exist`);
};

