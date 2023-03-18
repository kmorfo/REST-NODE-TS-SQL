import {
    Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
    HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, ModelDefined, Optional,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, ForeignKey, ENUM
} from 'sequelize';

import db from '../database/connection';
import Category from './category';

/* {
    id:1
    name:'Raúl',
    lastname:'Luján',
    email:'raul@test.es'
    password:'1324cifrado',
    image:'rutadelaimg',
    role:'role',
    state:true,
    google:false
} */
enum Roles { 'USER', 'ADMIN', 'SALES' }

class User extends Model {
    declare id: number;
    declare name: string;
    declare lastname: string;
    declare email: string;
    declare password: string;
    declare image: string;
    declare role: Roles;
    declare state: boolean;
    declare google: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;


    // Funciones de Sequelize para la relación, se pueden agregar o quitar segun necesitemos
    declare getCategories: HasManyGetAssociationsMixin<Category>;
    declare addCategory: HasManyAddAssociationMixin<Category, number>;
    declare addCategories: HasManyAddAssociationsMixin<Category, number>;
    declare setCategories: HasManySetAssociationsMixin<Category, number>;
    declare removeCategory: HasManyRemoveAssociationMixin<Category, number>;
    declare removeCategories: HasManyRemoveAssociationsMixin<Category, number>;
    declare hasCategory: HasManyHasAssociationMixin<Category, number>;
    declare hasCategories: HasManyHasAssociationsMixin<Category, number>;
    declare countCategories: HasManyCountAssociationsMixin;
    declare createCategory: HasManyCreateAssociationMixin<Category, 'ownerId'>;


    // También puede predeclarar posibles inclusiones
    declare categories?: NonAttribute<Category[]>;

    //Se declara la asociacion de categories con el tipo Categoria
    declare static associations: {
        categories: Association<User, Category>;
    };

    // Define la relación hasMany con el modelo Category
    static associate() {
        User.hasMany(Category, {
            foreignKey: 'UserId',
            as: 'categories',
        });
    }

    //Se sobreescribe el metodo para ajustar los parametros devueltos al usuario
    public toJSON(): User {
        //Extraemos los elementos que no queremos retornar
        const { password, role, state, createdAt, updatedAt, ...object } = this.dataValues;
        return object;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your name'
            }
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter your last name'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Please enter your email account'
            },
            isEmail: {
                msg: 'Please enter valid email account'
            },
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please enter any password'
            }
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM("USER", 'ADMIN', 'SALES'),
        defaultValue: 'USER'
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, { sequelize: db, modelName: 'User' });

export default User;
