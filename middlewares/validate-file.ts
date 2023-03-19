import {Request,Response, NextFunction } from 'express';


const validateUploadFile = (req: Request, res: Response, next: NextFunction) => {

    //Comprueba si tenemos archivos en la peticion
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image)
        return res.status(400).json({ msg: "No files to upload - image" });

    next();
};

export {
    validateUploadFile,
};
