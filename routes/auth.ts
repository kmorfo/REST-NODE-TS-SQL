import { Router } from 'express';
import { check } from 'express-validator';

import { googleSignIn, login, renewToken } from '../controllers';
import { validateFields } from '../middlewares';
import { validateJWT } from '../middlewares/validate-jwt';

/**
 * {{url}}/api/auth
*/
const authRoutes = Router();

authRoutes.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
], login);

authRoutes.post(
    "/google", [
    check("id_token", "Google id_token is required").not().isEmpty(),
    validateFields,
], googleSignIn
);
//Renovar el JWT validarJWT 
authRoutes.get('/renew', validateJWT, renewToken);

export default authRoutes;
