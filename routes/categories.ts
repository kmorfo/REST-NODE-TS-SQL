import { Router } from 'express';
import { check } from 'express-validator';
import { getCategories, getCategory, postCategory, putCategory, deleteCategory } from '../controllers';

import { validarJWT, validateFields, isAdminRole } from '../middlewares';


const categoryRoutes = Router();

categoryRoutes.get('/', getCategories);

categoryRoutes.get('/:id',[
    check('id', 'Not a valid id').isNumeric(),
    validateFields
] ,getCategory);

//Crear categoria persona con un token válido
categoryRoutes.post('/', [
    validarJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields
], postCategory);

//Actualizar categoria, lo podrá realizar cualquier persona con token válido
categoryRoutes.put('/:id', [
    validarJWT,
    check('id', 'Not a valid id').isNumeric(),
    validateFields
], putCategory);

//Solo pueden borrar categorias los usuarios con el rol ADMIN
categoryRoutes.delete('/:id', [
    validarJWT,
    check('id', 'Not a valid id').isNumeric(),
    isAdminRole,
    validateFields
], deleteCategory);

export default categoryRoutes