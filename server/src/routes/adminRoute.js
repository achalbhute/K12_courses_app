const express = require('express');
const models = require('./../models');

const CourseController = require('../controllers/courseController');
const cController = new CourseController(models.courses,null, {users: models.users});

const RegistrationController = require('../controllers/registrationController');
const rController = new RegistrationController(models.registrations,null);

const UserController = require('../controllers/userController');
const sController = new UserController(models.users,null);

var router  = express.Router();

// ************* Courses ***********

router.get('/courses', function(req, res){
    return cController.getCourses()
    .then(result => res.send(result));
});

router.get('/course/:id', function(req, res){
    const id = req.params.id;
   return cController.getCourse(id)
   .then (result => res.send(result));
});

router.post('/courses', function (req, res){
    const course = {
        coursename: req.body.coursename,
        details : req.body.details || req.body.coursename
    }
    return cController.postCourse(course)
    .then(result => res.send(result));
});

router.delete('/course/:id', function(req, res){
    const id = req.params.id;
    return cController.deleteCourse(id)
    .then(result => res.send(result));
});

//******************* Registration *********** */

router.post('/course/:id',
function (req, res){
    //res.locals = stduentid
    return rController.enroll( req.body.student_id, req.params.id)
    .then(result => res.send(result));
});

router.delete('/course/:id/remove', function(req, res){
    const registration ={
        course_id : req.params.id,
        stduent_id : req.body.student_id
    }
    return rController.remove(registration)
    .then(result => res.send(result));
});

// ***************** User ***********

router.get('/students/', function(req, res){
    return sController.getStudents()
    .then(result => res.send(result));
});

router.get('/student/:id', function(req, res){
    const id = req.params.id;
   return sController.getStudent(id)
   .then (result => res.send(result));
});

router.post('/students', function (req, res){
    const student = {
        username: req.body.studentname,
        password : req.body.password || req.body.studentname
    }
    return sController.postStudent(student)
    .then(result => res.send(result));
});

router.delete('/student/:id', function(req, res){
    const id = req.params.id;
    return sController.deleteStudent(id)
    .then(result => res.send(result));
});

module.exports = router;