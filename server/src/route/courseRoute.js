import express from 'express';
import models from './../models';
import bcrypt from 'bcryptjs';

var router  = express.Router();

    router.get('/', function(req, res){
        models.courses.findAll({}).then(function(courses){
            return res.send(courses);
        });
    });

    router.get('/:id', function(req, res){
        models.courses.findOne({
            where : {id : req.params.id }
        }).then(function(courses){
            return res.send(courses);
        });
    });

    router.post('/', function (req, res){
        models.courses.create({
            coursename : req.body.coursename, batch : 0
        }).then(function(){
            res.json({
                success : true,
                message : "Created new course"
            });
        });
    });

  module.exports = router;