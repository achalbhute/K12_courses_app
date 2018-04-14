const express =require('express');
var bcrypt = require('bcryptjs');
const models = require('./../models');
const UserController = require('../controllers/userController');
const controller = new UserController(models.users,null);
var router  = express.Router();
/*
    router.get('/', function(req, res){
        return controller.getStudents()
        .then(result => res.send(result));
    });
    
    router.get('/:id', function(req, res){
        const id = req.params.id;
       return controller.getStudent(id)
       .then (result => res.send(result));
    });
    router.post('/', function (req, res){
        const student = {
            username: req.body.studentname,
            password : req.body.password || req.body.studentname
        }
        return controller.postStudent(student)
        .then(result => res.send(result));
    });

    router.delete('/:id', function(req, res){
        const id = req.params.id;
        return controller.deleteStudent(id)
        .then(result => res.send(result));
    });
    */

    router.post('/login', function(req, res) {
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const user_ ={
        username : req.body.username,
        password : hashedPassword
      }
      return controller.loginUser(user_)
      .then(result => res.send(result));
    });
    
    router.patch('/changePassword',  function (req, res) {
      const user ={
        username : req.body.username,
        oldPassword : req.body.oldpassword,
        newpassword : req.body.newpassword
      }
      return controller.changePW(user)
        .then( result => res.send(result));
    });

  module.exports = router;