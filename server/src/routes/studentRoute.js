const express = require('express');
const models = require('./../models');
const CourseController = require('../controllers/courseController');
const cController = new CourseController(models.courses,null, {users: models.users});

const RegistrationController = require('../controllers/registrationController');
const rController = new RegistrationController(models.registrations,null);

var router  = express.Router();

// **************** Course **********

router.get('/courses', function(req, res){
    return cController.getCoursesAvail()
    .then(result => res.send(result));
});

router.get('/course/:id', function(req, res){
    const id = req.params.id;
   return cController.getCourse(id)
   .then (result => res.send(result));
});

// *********** Registration **********

router.post('/course/:id',
function (req, res){
   // res.locals = stduentid
   const registration ={
    course_id : req.params.id,
    student_id : req.body.student_id
}
return rController.enroll( registration)
    .then(result => res.send(result));
});

router.delete('/course/:id/leave', function(req, res){
    const registration ={
        course_id : req.params.id,
        student_id : req.body.student_id
    }
    return rController.remove(registration)
    .then(result => res.send(result));
});




module.exports = router;