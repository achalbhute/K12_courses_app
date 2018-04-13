const models = require('../model')

models.courses.findAll()
.then(res=>{
    console.log(res.dataValues);
})