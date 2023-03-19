import {
    DataTypes, BelongsToGetAssociationMixin, Model, ForeignKey, ENUM, InferCreationAttributes, InferAttributes, CreationOptional
} from 'sequelize';

import db from '../database/connection';
import User from './user';
import Category from './category';
/* {
        id:1
        name:'Disco Duro',
        price:33,3,
        description:texto que queramos,
        image: ruta de la imagen
        available:true
        state:true,
        createdAt:date,
        updatedAt:date,
        UserId: 1,
        CategoryId:1
    }
*/


class Product extends Model {
    declare id: CreationOptional<number>;
    declare name: string;
    declare price: number;
    declare description: string;
    declare image: CreationOptional<string>;
    declare available: CreationOptional<boolean>;
    declare state: CreationOptional<boolean>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare UserId: ForeignKey<User['id']>;
    declare CategoryId: ForeignKey<Category['id']>;

    // Función de Sequelize para la relación
    public getUser!: BelongsToGetAssociationMixin<User>;
    public getCategory!: BelongsToGetAssociationMixin<Category>;

    static associate() {
        Product.belongsTo(User);
        Product.belongsTo(Category);
    }

    //Se sobreescribe el metodo para ajustar los parametros devueltos al usuario
    public toJSON() {
        //Extraemos los elementos que no queremos retornar o modificar la visualizacion
        const { state, createdAt, updatedAt, ...object } = this.dataValues;

        return object;
    }
}
Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Please enter name of the product.'
            }
        }
    },
    price: {
        type: DataTypes.REAL,
        defaultValue: 0
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide an owner ID for the product'
            },
        }
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide an category ID for the product'
            },
        }
    }
}, {
    sequelize: db,
    modelName: 'Product',
    tableName: 'Products'
});


export default Product;