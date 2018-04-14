//const models = require('../models')

// // models.courses.findAll()
// // .then(res=>{
// //     console.log(res[0].dataValues);
// // })

// models.courses.findAll({
//     include: [{ model: models.users, as:"students" }]
// })
// .then(res=>{
//     const x = res.map(function(courses){
//         courses.students = courses.students.map(c=>c.dataValues)
//         return courses;
//     });
//     console.log(JSON.stringify(x));
// });
const testController = function(model, view){
    this.model = model;
    this.view = view;
}
testController.prototype = {
    getCourses: function(){
        return this.model.findAll()
        .then(res => res.dataValues);
    }
}