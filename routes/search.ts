import { Router } from 'express';
import { search } from '../controllers';


/**
 * {{url}}/api/search
*/
const searchRoutes = Router();

searchRoutes.get('/:collection/:term',search);

export default searchRoutes;