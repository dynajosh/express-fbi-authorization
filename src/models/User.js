// Run neccessary sequelize imports here


// User.js

import Sequelize from 'sequelize';
import sequelize from "../../config/database.js";

const { DataTypes } = Sequelize;

const User = sequelize.define("users", {
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique:true
    },
    first_name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : true
    },
    password_hash: {
        type: DataTypes.STRING,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    user_level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
});

User.hasMany(CaseFile, {foreignKey: 'author', as :'authoredCases'});

export default User;
