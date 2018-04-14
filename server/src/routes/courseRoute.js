const express =require('express');
const models = require('./../models');
const CourseController = require('../controllers/courseController');
const controller = new CourseController(models.courses,null, {users: models.users});
var router  = express.Router();

   /* router.get('/', function(req, res){
        return controller.getCourses()
        .then(result => res.send(result));
    });

    router.get('/:id', function(req, res){
        const id = req.params.id;
       return controller.getCourse(id)
       .then (result => res.send(result));
    });

    router.post('/', function (req, res){
        const course = {
            coursename: req.body.coursename,
            details : req.body.details || req.body.coursename
        }
        return controller.postCourse(course)
        .then(result => res.send(result));
    });

    router.delete('/:id', function(req, res){
        const id = req.params.id;
        return controller.deleteCourse(id)
        .then(result => res.send(result));
    });

    
*/
  module.exports = router;