
import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../instances/pg';

export interface UserInstance extends Model{
    id: number;
    name: string;
    age: number;
}

export const User = sequelize.define<UserInstance>("User", {
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true, // para o banco fazer a incrementação do id 
    },
    name: {
        type: DataTypes.STRING
    },
    age:{
        type: DataTypes.INTEGER,
        defaultValue: 18
    }
    },{
    tableName: 'users',
    timestamps: false
});