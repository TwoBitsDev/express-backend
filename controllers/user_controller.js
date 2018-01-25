const User = require('../models/UserModel');

module.exports = {
  create(req, res, next) {
    const userProps = req.body;

    User.create(userProps)
      .then(user => res.send(user))
      .catch((err) => res.send(err));
  },
  authenticate(req, res, next) {
    const userProps = req.body;

    if (userProps.email && userProps.password) {
      User.findOne({ email: userProps.email })
        .then(user => {
          console.log(user);
          if (user === null) {
            res.send({ // having trouble setting status, only works when not
               _id: null,
               error: "No matching account in our records",
               errorType: "email"
             });
          }
          if (user.password === userProps.password) {
            res.send({ _id: user._id });
          }
          if (user.password !== userProps.password) {
            res.send({
              _id: null,
              error: "The password provided does not match this email",
              errorType: "password"
             });
          }
        })
        .catch(next); //unsure what this does in this context
    } else {
      next({ type: 'wrong content', error: '/api/users/auth/ takes only email and password' });
    }
  },
};
