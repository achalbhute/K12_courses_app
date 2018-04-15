//const Op = Sequelize.Op;
const courseController = function(model, view, dependantModels){
    this.model = model;
    this.view = view;
    this.dependantModels = dependantModels;
}

courseController.prototype = {
    getCourses : function (){
        return this.model.findAll({
            include:[{model:this.dependantModels.users, as:"students"}]
        })
            .then(courses => courses);
            },
    
    getCoursesAvail : function (){
       /* return this.availableCourses() 
        .then ( courses =>{
        return this.model.findAll({
            where : {[Op.in] : [courses]},
           include:[{model:this.dependantModels.users, as:"students"}]
            })
            .then(courses => courses);
        })*/
        return this.getCourses()
        .then(courses=>{
            courses = courses.reduce(function(prev, curr){
                if(curr.students.length<5){
                    prev.push(curr);
                }
                return prev;
            },[])
            return courses;
        })
           },

    // availableCourses : function (){
    //     return this.model.findAndCountAll({
    //         attributes: ['course_id'],
    //         group: ['course_id']
    //       }).then( result => {
    //           console.log(result);
    //         if(result.count <5)
    //             return result.rows.course_id;
    //       }
    // );
    // },

    getCourse : function (id){
        return this.model.findOne({
            where : {id }
        }).then(courses=> courses);
    },

    postCourse : function (course){
        return this.model.create(course)
        .then(message => {
            return {
            success : true,
            message : "Created new course"
            }
        });
    },

    deleteCourse : function (id){
        return this.model.destroy({where:{id}})
        .then(message => {
            return {
                success : true,
                message : "Deleted course"
            }
        });
    }

}
module.exports = courseController;