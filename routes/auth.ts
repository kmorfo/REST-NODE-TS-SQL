
import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers';
import { validateFields } from '../middlewares';


const authRoutes = Router();

authRoutes.post('/login',[
    check('email','email is required').isEmail(),
    check('password','password is required').not().isEmpty(),
    validateFields
],login);



export default authRoutes;
