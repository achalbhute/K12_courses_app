module.exports = (sequelize, DataTypes) =>{
    var Course = sequelize.define('courses',{
        id : {
            type : DataTypes.INTEGER,
            primaryKey:true
        },
        coursename : {
            type : DataTypes.STRING
        },
        batch : {
            type : DataTypes.INTEGER
        }
    },{
        timestamps : false,
        underscored:true
    });
// Course.associate = function (models) {

//     models.course.belongsToMany(models.users, { foreignKey: 'user_id', as: "seller" });

//     models.cars.belongsTo(models.users, { foreignKey: 'buyer_id', as: "buyer" });

// };
    Course.associate = function(models){
        models.courses.belongsToMany(models.users, { as: 'Registrations', through: { model: models.registrations, unique: false }, 
        foreignKey: 'course_id',
        otherKey:'student_id' });    
    }
    return Course;
}