const registrationController = function(model, view){
    this.model = model;
    this.view = view;
}

registrationController.prototype = {
    enroll : function(registration){
        this.count(registration.course_id)
        .then(c=> {
            if(c<5){
                return this.model.create({
                    student_id : registration.student_id, course_id : registration.course_id
                });
            }else{
                throw Error("5 already enrolled")
            }
        })
        .then(message => {
            return {
            success : true,
            message : "Registered"
            }
        })
        .catch(err=>{
            return err;
        });
       
    },

    count: function(course_id){
        return this.model.findAndCountAll({where:{course_id}})
        .then(c=>c);
    },

    remove : function (registration){
        return this.model.destroy({
            where:{ student_id : registration.student_id, course_id : registration.course_id}
        }).then(message => {
            return {
                success : true,
                message : "Deleted course"
            }
        });
    }
}
module.exports = registrationController;