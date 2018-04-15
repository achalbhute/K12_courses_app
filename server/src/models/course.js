module.exports = (sequelize, DataTypes) =>{
    var Course = sequelize.define('courses',{
        id : {
            type : DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement : true
        },
        coursename : {
            type : DataTypes.STRING
        },
        details : {
            type : DataTypes.TEXT
        }
    },{
        timestamps : false,
        underscored:true
    });
// Course.associate = function (models) {
//     models.course.belongsToMany(models.users, { foreignKey: 'user_id', as: "seller" });
//     models.cars.belongsTo(models.users, { foreignKey: 'buyer_id', as: "buyer" });s
// };
    Course.associate = function(models){
        models.courses.belongsToMany(models.users, { as: 'students', onDelete : 'cascade',  through: { model: models.registrations, unique: false }, 
        foreignKey: 'course_id',
        //otherKey:'student_id' 
    });    
    }
    return Course;
}