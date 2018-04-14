var bcrypt = require('bcryptjs');

const userController = function(model, view){
    this.model = model;
    this.view = view;
}

userController.prototype = {
    getStudents : function (){
        return this.model.findAll({
            where : {role : 'student'}
        })
            .then(students => students);
            },

    getStudent : function (id){
        return this.model.findOne({
            where : {id }
        }).then(students=> students);
    },

    postStudent : function (student){
        return this.model.create(student)
        .then(message => {
            return {
            success : true,
            message : "Created new student"
            }
        });
    },

    deleteStudent : function (id){
        return this.model.destroy({where:{id}})
        .then(message => {
            return {
                success : true,
                message : "Deleted student"
            }
        });
    },

    loginUser : function(user_){
        return this.model.findOne({
        where: {username : user_.username}
    }).then(function(user) {
        if(user){
            var passwordIsValid = bcrypt.compareSync(user_.password, user.password);
            if (!passwordIsValid) {
                return { auth: false, token: null }
            };
            user.password = "";
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              return {success:true, token, user};
         }else{
            return { auth: false, token: null };
         }
        });
    },

    
}
module.exports = userController;