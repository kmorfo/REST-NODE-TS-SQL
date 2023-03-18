import { Router } from 'express';
import { check } from 'express-validator';
import { getProducts,getProduct, postProduct,putProduct,deleteProduct} from '../controllers';

import { validarJWT, validateFields, isAdminRole } from '../middlewares';


const productRoutes = Router();

productRoutes.get('/', getProducts);

productRoutes.get('/:id',[
    check('id', 'Not a valid id').isNumeric(),
    validateFields
] ,getProduct);

//Crear producto persona con un token válido
productRoutes.post('/', [
    validarJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields
], postProduct);

//Actualizar product, lo podrá realizar cualquier persona con token válido
productRoutes.put('/:id', [
    validarJWT,
    check('id', 'Not a valid id').isNumeric(),
    validateFields
], putProduct);

//Solo pueden borrar productos los usuarios con el rol ADMIN
productRoutes.delete('/:id', [
    validarJWT,
    check('id', 'Not a valid id').isNumeric(),
    isAdminRole,
    validateFields
], deleteProduct);

export default productRoutes