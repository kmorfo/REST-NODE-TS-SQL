import { DataTypes, Model} from 'sequelize';
import db from '../database/connection';


/* {
        id:1
        name:'ADMIN',
    }
*/

class Role extends Model{
    declare id:number;
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
        validate: {
            notNull: {
                msg: 'Please enter the enter role name.'
            }
        }
    },
},{ sequelize: db, modelName: 'Role' });

export default Role;