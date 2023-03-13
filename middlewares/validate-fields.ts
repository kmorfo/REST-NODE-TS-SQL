import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateFields = (req: Request, res: Response, next: NextFunction) => {

    //Obtenemos los errores de las validaciónes realizadas por los middlewares
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors });

    next();

}

