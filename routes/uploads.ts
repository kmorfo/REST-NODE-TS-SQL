import { Router } from 'express';
import { check } from 'express-validator';

import { loadFile, showImage, updateImage, updateImageCloudDinary } from '../controllers';
import { collectionAllowed } from '../helpers';
import { validateFields, validateUploadFile } from '../middlewares';


/**
 * {{url}}/api/uploads
*/
const uploadRoutes = Router();

//cargar un nuevo archivo
uploadRoutes.post("/", validateUploadFile, loadFile);

//Actualizar las imagenes del usuario
uploadRoutes.put(
    "/:collection/:id",
    [
        check('id', 'Its not  a valid id').isNumeric(),
        validateUploadFile,
        //Validacion personalizada que controlara que coleccion este entre las permitidas
        check("collection").custom((c) =>
            collectionAllowed(c, ["users", "products"])
        ),
        validateFields,
    ],
    updateImage
);

uploadRoutes.get(
    "/:collection/:id",
    [
        check('id', 'Its not  a valid id').isNumeric(),
        //Validacion personalizada que controlara que coleccion este entre las permitidas
        check("collection").custom((c) =>
            collectionAllowed(c, ["users", "products"])
        ),
        validateFields,
    ],
    showImage
);

/**
 * Rutas para trabajar con las imagenes de CloudDinary
 * NOTA -> se agrega a la ruta cd/ antes de los parametros /api/uploads/cd/coleccion/id
 */
uploadRoutes.put(
    "/cd/:collection/:id",
    [
        validateUploadFile,
        check('id', 'Its not  a valid id').isNumeric(),
        //Validacion personalizada que controlara que coleccion este entre las permitidas
        check("collection").custom((c) =>
            collectionAllowed(c, ["users", "products"])
        ),
        validateFields,
    ],
    updateImageCloudDinary
);




export default uploadRoutes;