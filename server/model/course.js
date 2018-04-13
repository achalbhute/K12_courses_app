module.exports = (sequelize, DataTypes) =>{
    var Course = sequelize.define('courses',{
        coursename : {
            type : DataTypes.STRING
        },
        batch : {
            type : DataTypes.INTEGER
        }
    },{
        timestamps : false
    });
Course.belongsToMany(User, { as: 'Users', through: { model: UserRole, unique: false }, foreignKey: 'course_id' });    
    return Course;
}