import {
    DataTypes,  BelongsToGetAssociationMixin, Model, ForeignKey, ENUM
} from 'sequelize';

import db from '../database/connection';
import User from './user';


/* {
        id:1
        name:'HARDWARE',
        state:true,
        createdAt:date,
        updatedAt:date,
        UserId: 1
    }
*/


class Category extends Model {
    declare id: number;
    declare name: string;
    declare state: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;

    declare UserId: ForeignKey<User['id']>;

    // Función de Sequelize para la relación
    public getUser!: BelongsToGetAssociationMixin<User>;

    static associate() {
        Category.belongsTo(User);
    }

    //Se sobreescribe el metodo para ajustar los parametros devueltos al usuario
    public  toJSON (): Category {
        //Extraemos los elementos que no queremos retornar o modificar la visualizacion
        const {  UserId, state, createdAt, updatedAt, ...object } = this.dataValues;

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
        unique:true,
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