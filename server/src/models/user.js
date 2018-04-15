module.exports = (sequelize, DataTypes) =>{
    var User = sequelize.define('users',{
        id : {
            type : DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement : true
            
        },
        username : {
            type : DataTypes.STRING
        },
        password : {
            type : DataTypes.STRING
        },
        role : {
            type : DataTypes.STRING
        }
    },{
        timestamps : false
    });
    //User.belongsToMany(Course, { as: 'Course', through: { model: Registration, unique: false }, foreignKey: 'user_id' });
    User.associate = function(models){
        models.users.belongsToMany(models.courses, { as: 'courses', through: { model: models.registrations, unique: false }, 
        foreignKey: 'student_id',
        //otherKey:'course_id' 
    });    
    }
    return User;
}