module.exports = (sequelize, DataTypes) =>{
    var Registration = sequelize.define('registrations',{
        id : {
            type : DataTypes.INTEGER,
            primaryKey:true
        },
        student_id : {
            type : DataTypes.INTEGER
        },
        course_id : {
            type : DataTypes.INTEGER
        }
    },{
        timestamps : false,
        underscored:true
    });
    return Registration;
} 