import { Router, Request } from 'express';
import { check } from 'express-validator';

import { isValidRole, existEmail, existUserID } from '../helpers';
import { validateFields } from '../middlewares';

import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers';


const userRoutes = Router();

userRoutes.get('/', getUsers);

userRoutes.get('/:id', [
    check('id', 'Not a valid id').isNumeric(),
    check('id').custom(existUserID),
    validateFields
], getUser);

userRoutes.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('lastname', 'lastname is required').not().isEmpty(),
    check('email', 'email is not valid').isEmail(),
    check('email').custom(existEmail),
    check('password', 'password is required and must contain at least 6 characters').isLength({ min: 6 }),
    // check('role','Not a valid role').isIn(['USER', 'ADMIN']), //Validamos en duro contra un array string
    check('role').custom(isValidRole),
    validateFields
], postUser);

userRoutes.put('/:id', [
    check('id', 'Not a valid id').isNumeric(),
    check('id').custom(existUserID),
    //check("role").custom(isValidRole), //De esta forma se tendria que enviar un rol valido
    validateFields
], putUser);

userRoutes.delete('/:id', [
    check('id', 'Not a valid id').isNumeric(),
    check('id').custom(existUserID),
    validateFields
], deleteUser);

export default userRoutes;

//Estoy en el video 134
// https://www.udemy.com/course/node-de-cero-a-experto/learn/lecture/9644806#overview