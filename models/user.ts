import { DataTypes, Model, Sequelize, ENUM } from 'sequelize';
import db from '../database/connection';

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

class User extends Model {
    declare id: number;
    declare password: string;

    //Se sobreescribe el metodo para ajustar los parametros devueltos al usuario
    public toJSON(): object {
        //Extraemos los elementos que no queremos retornar
        const { password,role,state, createdAt,updatedAt,...object } = this.dataValues;
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
}, { sequelize: db, modelName: 'User' });

export default User;