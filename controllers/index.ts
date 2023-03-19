import { deleteUser, getUser, getUsers, postUser, putUser } from './users';
import { getCategories, getCategory, postCategory, putCategory, deleteCategory } from './categories';
import { getProduct, getProducts, postProduct, putProduct, deleteProduct } from './products'
import { loadFile,showImage,updateImage,updateImageCloudDinary } from './uploads';
import { login, renewToken, googleSignIn } from './auth';
import { search } from './search';

export {
    deleteUser, getUser, getUsers, postUser, putUser,
    getCategories, getCategory, postCategory, putCategory, deleteCategory,
    getProduct, getProducts, postProduct, putProduct, deleteProduct,
    loadFile,showImage,updateImage,updateImageCloudDinary,
    login, renewToken, googleSignIn,
    search
}