const lmsstudentController = require("../database/repository/lmsstudentController");

module.exports = (app) => {
    app.post('/api/auth/createLmsStudent', lmsstudentController.createLmsStudent);
    app.get('/api/auth/getLmsStudents', lmsstudentController.getLmsStudents);
    app.put('/api/auth/updateLmsStudent', lmsstudentController.updateLmsStudent);
    app.delete('/api/auth/deleteLmsStudent/:id', lmsstudentController.deleteLmsStudent);
    app.post('/api/auth/login', lmsstudentController.login);
    app.post('/api/auth/checkDuplicateStudentName', lmsstudentController.checkDuplicateStudentName);
    app.post('/api/auth/checkDuplicateStudentContact', lmsstudentController.checkDuplicateStudentContact);
  };