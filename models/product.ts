import {
    DataTypes,  BelongsToGetAssociationMixin, Model, ForeignKey, ENUM
} from 'sequelize';

import db from '../database/connection';
import User from './user';
/* {
        id:1
        name:'Disco Duro',
        price:33,3,
        description:texto que queramos,
        available:true
        state:true,
        createdAt:date,
        updatedAt:date,
        UserId: 1,
        categoryId:1
    }
*/


class Product extends Model {

}


export default Product;