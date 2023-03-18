import { deleteUser, getUser, getUsers, postUser, putUser } from './users';
import { login, renewToken, googleSignIn } from './auth';
import { getCategories, getCategory, postCategory, putCategory, deleteCategory } from './categories';
import{getProduct, getProducts, postProduct, putProduct, deleteProduct } from './products'


export {
    deleteUser, getUser, getUsers, postUser, putUser,
    login, renewToken, googleSignIn,
    getCategories, getCategory, postCategory, putCategory, deleteCategory,
    getProduct, getProducts, postProduct, putProduct, deleteProduct 
}