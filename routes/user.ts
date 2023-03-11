import { Router } from 'express';
import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);
userRoutes.post('/', postUser);
userRoutes.put('/:id', putUser);
userRoutes.delete('/:id', deleteUser);



export default userRoutes;