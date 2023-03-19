import { Router } from 'express';
import { check } from 'express-validator';
import { getProducts,getProduct, postProduct,putProduct,deleteProduct} from '../controllers';
import { existProductID } from '../helpers';

import { validarJWT, validateFields, isAdminRole } from '../middlewares';
import { existCategoryID } from '../helpers/db-validators';


/**
 * {{url}}/api/products
*/
const productRoutes = Router();

productRoutes.get('/', getProducts);

productRoutes.get('/:id',[
    check('id', 'Its not a valid id').isNumeric(),
    check("id").custom(existProductID),
    validateFields
] ,getProduct);


//Crear producto persona con un token válido
productRoutes.post('/', [
    validarJWT,
    check('name', 'name is required').not().isEmpty(),
    check('description', 'name is required').not().isEmpty(),
    check('categoryId').custom(existCategoryID),
    validateFields
], postProduct);

//Actualizar product, lo podrá realizar cualquier persona con token válido
productRoutes.put('/:id', [
    validarJWT,
    check('id', 'Its not a valid id').isNumeric(),
    check('id').custom(existProductID),
    validateFields
], putProduct);

//Solo pueden borrar productos los usuarios con el rol ADMIN
productRoutes.delete('/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'Its not a valid id').isNumeric(),
    check("id").custom(existProductID),
    validateFields
], deleteProduct);

export default productRoutes