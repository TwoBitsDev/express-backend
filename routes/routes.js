const TestController = require('../controllers/test_controller');
const UserController = require('../controllers/user_controller');

module.exports = (app) => {
  //app.get('path', contoller.something);

  app.get('/api/test/', TestController.test);
  app.post('/api/users/', UserController.create);
  app.post('/api/users/auth', UserController.authenticate);
};

//password2?
