const registrationController = function(model, view){
    this.model = model;
    this.view = view;
}

registrationController.prototype = {
    enroll : function(student_id, course_id){
        this.count(course_id)
        .then(c=> {
            if(c<5){
                return this.model.create({
                    student_id, course_id
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
            res.send(err)
        });
       
    },
    count: function(course_id){
        return this.model.findAndCount({where:{course_id}})
        then(c=>c);
    }
}
module.exports = registrationController;