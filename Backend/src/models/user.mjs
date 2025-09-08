import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
}, {
    tableName: 'usuarios',
    timestamps: false
});

export default User;