import { DataTypes, Model} from 'sequelize';
import db from '../database/connection';


/* {
        id:1
        name:'ADMIN',
    }
*/

class Role extends Model{
    declare id:number;
    declare name:number;
}

Role.init({
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
                msg: 'Please enter the role name.'
            }
        }
    },
},{ sequelize: db, modelName: 'Role' });

export default Role;