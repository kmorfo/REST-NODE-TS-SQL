
import jwt from 'jsonwebtoken';

/**
 * Función para crear un token a partir del uid del usuario enviado por parametros
 * @param {string} id
 * @returns Promise con el token creado
 */
export const generateJWT = (id: string) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            { expiresIn: "4h" },
            (error, token) => {
                (error) ? reject('Failed to generate token') : resolve(token);
            }
        );
    });
};

export const checkJWT = (token: string) => {
    //Validamos que el token existe y es valido
    try {
        const { id } = jwt.verify(token, process.env.JWT_KEY as string);

        return [true, id];
    } catch (error) {
        return [false, null];
    }
};