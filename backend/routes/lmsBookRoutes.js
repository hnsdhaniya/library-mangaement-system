const lmsBookController = require("../database/repository/lmsBookController");

module.exports = (app) => {
    app.post('/api/auth/createLmsBooks', lmsBookController.createLmsBooks);
    app.get('/api/auth/getLmsBooks', lmsBookController.getLmsBooks);
    app.put('/api/auth/updateLmsBooks/:id', lmsBookController.updateLmsBooks);
    app.delete('/api/auth/deleteLmsBooks/:id', lmsBookController.deleteLmsBooks);
  };
