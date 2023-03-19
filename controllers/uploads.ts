import { Request,Response } from "express";
import path from "path";
import fs from "fs";

import { uploadFile } from "../helpers";
import {User,Product,Category} from '../models';

//Importación y config para trabajar con cloudDinary
const cloudDinary = require("cloudinary").v2;


export const loadFile = async (req:Request, res :Response) => {
    try {
        //Si queremos que se cree la carpeta destino en caso de que no exista se habilita en la config del server createParentPath: true,
        // const filename = await subirArchivo(req.files, ["txt", "md"],'textos');
        //Imagenes, podriamos enviar las extensiones validas [] y la subcarpeta donde se almacenara
        const filename = await uploadFile(req.files, undefined, "images");
        res.json({ filename });
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const updateImage = async (req:Request, res :Response) => {
    const { collection, id } = req.params;

    let model;
    switch (collection) {
        case "users":
            model = await User.findByPk(id);
            if (!model)
                return res
                    .status(400)
                    .json({ msg: `The user with the id ${id} does not exist` });
            break;
        case "products":
            model = await Product.findByPk(id);
            if (!model)
                return res
                    .status(400)
                    .json({ msg: `The product with the id ${id} does not exist` });
            break;
        default:
            return res.status(500).json({ msg: "Collection not included" });
    }

    //Limpiar imagenes previas
    try {
        if (model.image) {
            //Hay que borrar la imagen del servidor
            const pathImagen = path.join(
                __dirname,
                "../uploads",
                collection,
                model.image
            );
            if (fs.existsSync(pathImagen)) fs.unlinkSync(pathImagen);
        }
    } catch (err) {
        res.status(400).json({ err });
    }

    //En caso de no enviar el archivo se controla la excepcion
    try {
        model.image = await uploadFile(req.files, undefined, collection) as string;
        await model.save();

        res.json({ model });
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const showImage = async (req:Request, res :Response) => {
    const { collection, id } = req.params;

    let model;
    switch (collection) {
        case "users":
            model = await User.findByPk(id);
            if (!model)
                return res
                    .status(400)
                    .json({ msg: `The user with the id ${id} does not exist` });

            break;
        case "products":
            model= await Product.findByPk(id);
            if (!model)
                return res
                    .status(400)
                    .json({ msg: `The product with the id ${id} does not exist` });

            break;
        default:
            return res.status(500).json({ msg: "Collection not included" });
    }

    try {
        //Obtenemos la direccion de la imagen
        if (model.image) {
            const pathImagen = path.join(
                __dirname,
                "../uploads",
                collection,
                model.image
            );
            if (fs.existsSync(pathImagen)) return res.sendFile(pathImagen);
        }
    } catch (err) {
        res.status(400).json({ err });
    }

    const pathImagen = path.join(__dirname, "../assets", "no-image.jpg");
    res.sendFile(pathImagen);
};



/**
 * Funciones para trabajar con las imagenes de CloudDinary
 */
export const updateImageCloudDinary = async (req:Request, res :Response) => {
    const { collection, id } = req.params;

    cloudDinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

    let model;
    switch (collection) {
        case "users":
            model = await User.findByPk(id);
            if (!model)
                return res
                    .status(400)
                    .json({ msg: `The user with the id  ${id} does not exist` });

            break;
        case "products":
            model = await Product.findByPk(id);
            if (!model)
                return res
                    .status(400)
                    .json({ msg: `The product with the id ${id} does not exist` });

            break;
        default:
            return res.status(500).json({ msg: "No valid collection included" });
    }

    //Limpiar imagenes previas
    if (model.image) {
        //Obtenemos el nombre de la imagen, sin la ruta ni extension
        const nameArr = model.image.split("/");
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split(".");
        cloudDinary.uploader.destroy(public_id);//Se borra
    }

    //Obtenemos el path temporal del archivo para subirlo
    const { tempFilePath } = req.files.image;
    
    //Subimos el archivo a CloudDinary
    const { secure_url } = await cloudDinary.uploader.upload(tempFilePath);

    model.image = secure_url;
    await model.save();

    res.json({ model });
};