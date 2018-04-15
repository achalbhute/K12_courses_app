var bcrypt = require('bcryptjs');
var jwt= require('jsonwebtoken');
var config    = require(__dirname + '/../../config/config.js');


const userController = function(model, view){
    this.model = model;
    this.view = view;
}

userController.prototype = {
    getStudents : function (){
        return this.model.findAll({
            where : {role : 'student'}
        }).then(students => students);
    },

    getStudent : function (id){
        return this.model.findOne({
            where : {id }
        }).then(students=> students);
    },

    postStudent : function (student){
        console.dir(student);
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
            console.log(user_.password)
            console.log(user.password)
            var passwordIsValid = bcrypt.compareSync(user_.password, user.password);
            console.log(passwordIsValid);
            if (!passwordIsValid) {
                return { auth: false, token: null }
            }
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

    changePW : function(user){
        return this.oldPWmatch(user)
        .then(result => {
            if(result.matched)
                return this.model.update({ "password": user.newpassword }, { where: { username: user.username } })
            else{
                return {
                    success: false,
                    message: 'Old password didn\'t match'
                }     
            }      
        })
        .then(message =>{
            if(message.success === false){
                return message;
            }
            return {
              success:true,
              message: 'Successfully updated password!'
            }
        });
    },

    oldPWmatch: function(user_){
        return this.model.findOne({where:{username :user_.username}})
        .then(function(user) {
            if(user){
                console.dir(user_);
                console.dir(user.dataValues);
                var passwordIsValid = (user_.oldPassword  === user.dataValues.password);
                console.log(passwordIsValid)
                if (!passwordIsValid) {
                    return {matched:false, user: null}; //{ auth: false, token: null }
                };
                  return {matched:true, user: user};
             }else{
                return {matched:false, user: null};  //{ auth: false, token: null };
             }
            });
    },
    
    checkAuth(req, res, next) {

        var token = req.headers['x-access-token'];
        if (!token) {
            return res.send({ auth: false, message: 'No token provided.' });
        }
    
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.send({ auth: false, message: 'Failed to authenticate token.' });
            }
            var userID = decoded.id;
            models.users.findById(userID)
                .then(function (user) {
                    res.locals.user = user.dataValues;
                    next();
                })
        });
    }
}
module.exports = userController;