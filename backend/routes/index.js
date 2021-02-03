const lmsStudentRoutes = require("./lmsStudentRoutes");
const lmsBookRoutes = require("./lmsBookRoutes");


module.exports = router => {
    lmsStudentRoutes(router);
    lmsBookRoutes(router);
  return router;
};
