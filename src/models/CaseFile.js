import Sequelize from 'sequelize';
import sequelize from "../../config/database.js";



const {DataTypes} = Sequelize;

const CaseFile = sequelize.define("case_files",{
    file_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
        unique:true
    },
    required_access_level : {
        type: DataTypes.INTEGER,
        defaultValue:1
    },
    title: {
        type:DataTypes.STRING,
        aallowNull: false
    },
    body: {
        type:DataTypes.STRING,
        allowNull:false
    },
    author: {
        type:DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'user_id'
        }
    }
})

CaseFile.belongsTo(User, {foreignKey: 'author', as: 'caseAuthor'});


export default CaseFile;