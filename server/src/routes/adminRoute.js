const express = require('express');
const models = require('./../models');
var bcrypt = require('bcryptjs');
var jwt= require('jsonwebtoken');
var config    = require(__dirname + '/../../config/config.js');

const CourseController = require('../controllers/courseController');
const cController = new CourseController(models.courses,null, {users: models.users});

const RegistrationController = require('../controllers/registrationController');
const rController = new RegistrationController(models.registrations,null);

const UserController = require('../controllers/userController');
const sController = new UserController(models.users,null);

var router  = express.Router();


function checkAuth (req, res, next) {
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

// ************* Courses ***********

router.get('/courses', checkAuth, function(req, res){
    return cController.getCourses()
    .then(result => res.send(result));
});

router.get('/course/:id', checkAuth, function(req, res){
    const id = req.params.id;
   return cController.getCourse(id)
   .then (result => res.send(result));
});

router.post('/courses', checkAuth, function (req, res){
    const course = {
        coursename: req.body.coursename,
        details : req.body.details || req.body.coursename
    }
    return cController.postCourse(course)
    .then(result => res.send(result));
});

router.delete('/course/:id', checkAuth, function(req, res){
    const id = req.params.id;
    return cController.deleteCourse(id)
    .then(result => res.send(result));
});

//******************* Registration *********** */

router.post('/course/:id', checkAuth, function (req, res){
    const registration ={
        course_id : req.params.id,
        student_id : req.body.student_id
    }
    return rController.enroll( registration)
    .then(result => res.send(result));
});

router.delete('/course/:id/leave', checkAuth, function(req, res){
    const registration ={
        course_id : req.params.id,
        student_id : req.body.student_id
    }
    return rController.remove(registration)
    .then(result => res.send(result));
});

// ***************** User ***********

router.get('/students/', checkAuth, function(req, res){
    return sController.getStudents()
    .then(result => res.send(result));
});

router.get('/student/:id', checkAuth, function(req, res){
    const id = req.params.id;
   return sController.getStudent(id)
   .then (result => res.send(result));
});

router.post('/students', checkAuth, function (req, res){
    var password;
    bcrypt.hash((req.body.password || req.body.studentname), 10, function(err, hash) {
        password= hash;
        const student = {
        username: req.body.studentname,
        password : password
    }
    return sController.postStudent(student)
    .then(result => res.send(result));
    });
    
});

router.delete('/student/:id', checkAuth, function(req, res){
    const id = req.params.id;
    return sController.deleteStudent(id)
    .then(result => res.send(result));
});




module.exports = router;