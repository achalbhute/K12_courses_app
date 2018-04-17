const express =require('express');
var bcrypt = require('bcryptjs');
const models = require('./../models');
const UserController = require('../controllers/userController');
const controller = new UserController(models.users,null, {courses:models.courses});
var router  = express.Router();


    router.post('/login', function(req, res) {
      const user_ ={
        username : req.body.username,
        password : req.body.password
      }
      return controller.loginUser(user_)
      .then(result => res.send(result));
    });
    
    router.patch('/changePassword',  function (req, res) {
        bcrypt.hash(req.body.newpassword, 10, function(err, hash) {
            const password=hash;
            const user ={
            username : req.body.username,
            oldpassword : req.body.oldpassword,
            newpassword : password
        }
        return controller.changePW(user)
            .then( result => res.send(result));
        });
    });

  module.exports = router;