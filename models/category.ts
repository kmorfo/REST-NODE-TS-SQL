import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional, BelongsToGetAssociationMixin,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, ENUM
} from 'sequelize';

import db from '../database/connection';
import { User, Product } from './';


/* {
        id:1
        name:'HARDWARE',
        state:true,
        createdAt:date,
        updatedAt:date,
        UserId: 1
    }
*/


class Category extends Model<InferAttributes<Category, { omit: 'products' }>,
    InferCreationAttributes<Category, { omit: 'products' }>>  {
    declare id: CreationOptional<number>;
    declare name: string;
    declare state: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare UserId: ForeignKey<User['id']>;
    declare products?: NonAttribute<Category[]>;

    // Funciones de Sequelize para la relación, se pueden agregar o quitar segun necesitemos
    declare getProducts: HasManyGetAssociationsMixin<Product>;
    declare addProduct: HasManyAddAssociationMixin<Product, number>;
    declare addProducts: HasManyAddAssociationsMixin<Product, number>;
    declare setProduct: HasManySetAssociationsMixin<Product, number>;
    declare removeProduct: HasManyRemoveAssociationMixin<Category, number>;
    declare removeProducts: HasManyRemoveAssociationsMixin<Product, number>;
    declare hasProduct: HasManyHasAssociationMixin<Product, number>;
    declare hasProducts: HasManyHasAssociationsMixin<Product, number>;
    declare countProduct: HasManyCountAssociationsMixin;
    declare createProduct: HasManyCreateAssociationMixin<Product, 'CategoryId'>;

    //Se declara la asociacion de products con el tipo Categoria
    declare static associations: {
        products: Association<Category, Product>;
    };

    // Función de Sequelize para la relación
    public getUser!: BelongsToGetAssociationMixin<User>;

    static associate() {
        Category.belongsTo(User);
        Category.hasMany(Product, {
            foreignKey: 'CategoryId',
            as: 'products',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    }

    //Se sobreescribe el metodo para ajustar los parametros devueltos al usuario
    public toJSON() {
        //Extraemos los elementos que no queremos retornar o modificar la visualizacion
        const { UserId, state, createdAt, updatedAt, ...object } = this.dataValues;

        return object;
    }

}

Category.init({
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
                msg: 'Please enter name of the category.'
            }
        }
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please provide an owner ID for the category'
            },
        }
    }
}, {
    sequelize: db,
    modelName: 'Category',
    tableName: 'Categories'
});



export default Category;