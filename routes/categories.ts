import { Router } from 'express';
import { check } from 'express-validator';
import { getCategories, getCategory, postCategory, putCategory, deleteCategory } from '../controllers';
import { existCategoryID } from '../helpers';

import { validarJWT, validateFields, isAdminRole } from '../middlewares';

/**
 * {{url}}/api/categories
*/
const categoryRoutes = Router();

categoryRoutes.get('/', getCategories);

categoryRoutes.get('/:id',[
    check('id', 'Its not  a valid id').isNumeric(),
    check("id").custom(existCategoryID),
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
    check('id', 'Its not  a valid id').isNumeric(),
    check("id").custom(existCategoryID),
    validateFields
], putCategory);

//Solo pueden borrar categorias los usuarios con el rol ADMIN
categoryRoutes.delete('/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'Its not  a valid id').isNumeric(),
    check("id").custom(existCategoryID),
    validateFields
], deleteCategory);

export default categoryRoutes