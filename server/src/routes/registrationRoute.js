const express = require('express');
const models = require('./../models');
const RegistrationController = require('../controllers/registrationController');
const controller = new RegistrationController(models.registrations,null);
var router  = express.Router();

router.post('/:id/enroll',
function (req, res){
    res.locals = stduentid
    return controller.enroll( req.body.studentid, req.params.id)
    .then(result => res.send(result));
});

module.exports = router;