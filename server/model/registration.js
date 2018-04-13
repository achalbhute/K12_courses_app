module.exports = (sequelize, DataTypes) =>{
    var Registration = sequelize.define('registrations',{
        id : {
            type : DataTypes.INTEGER
        }
    },{
        timestamps : false
    });
    return Registration;
} 