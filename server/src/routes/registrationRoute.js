const express = require('express');
const models = require('./../models');
const RegistrationController = require('../controllers/registrationController');
const controller = new RegistrationController(models.registrations,null);
var router  = express.Router();
/*
router.post('/:id',
function (req, res){
    res.locals = stduentid
    return controller.enroll( req.body.studentid, req.params.id)
    .then(result => res.send(result));
});

router.delete('/:id', function(req, res){
    const registration ={
        course_id : req.params.id,
        stduent_id : req.body.studentid
    }
    return controller.remove(registration)
    .then(result => res.send(result));
});
*/
module.exports = router;