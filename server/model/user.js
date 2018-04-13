module.exports = (sequelize, DataTypes) =>{
    var User = sequelize.define('users',{
        username : {
            type : DataTypes.STRING
        },
        passsword : {
            type : DataTypes.STRING
        },
        role : {
            type : DataTypes.STRING
        }
    },{
        timestamps : false
    });
    User.belongsToMany(Course, { as: 'Course', through: { model: Registration, unique: false }, foreignKey: 'user_id' });
    return User;
}