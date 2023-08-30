import User from "./User.js";
import CaseFile from "./CaseFile.js";

CaseFile.belongsTo(User, {foreignKey: 'author', as: 'caseAuthor'});
User.hasMany(CaseFile, {foreignKey: 'author', as :'authoredCases'});


export {
    User,
    CaseFile
}