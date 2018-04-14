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
    
    availableCourses : function (){

    },

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