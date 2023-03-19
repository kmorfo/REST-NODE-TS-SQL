import path from "path";

import { v4 as uuidv4 } from 'uuid';
import fileUpload from "express-fileupload";

const uploadFile = (
    files: fileUpload.FileArray | null | undefined,
    validExtensions = ["png", "jpg", "jpeg", "gif", "svg"],
    folder: string
) => {
    return new Promise((resolve, reject) => {
        //Obtenemos el archivo, de la misma forma si admitieramos varios archivos 
        //los podriamos procesar igual en un bucle uno a uno

        //Obtenemos el nombre del archivo que enviamos
        const { image } = files;

        if (!image) reject('A file with the name image was not received');

        //Obtenemos la extensión
        const splitedName: string[] = image.name.split(".");
        const extension = splitedName[splitedName.length - 1];

        //Validamos la extensión
        if (!validExtensions.includes(extension))
            return reject(
                `${extension} is not a valid extencion - ${validExtensions}`
            );

        //Creamos un nombre unico atraves de uuid
        const nameTemp = uuidv4() + "." + extension;

        //Creamos el path donde se subira el archivo
        let uploadPath = path.join(__dirname, "../uploads/", folder, nameTemp);

        image.mv(uploadPath, (err: Error) => {
            if (err) return reject(err);

            resolve(nameTemp);
        });
    });
};

export { uploadFile }
