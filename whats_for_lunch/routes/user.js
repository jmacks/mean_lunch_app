'use strict';
//requirements
const express = require('express');
const router = express.Router();
const user = require('../controllers/users_controller');

router.route('/user')
      .post(user.create)
      .get(user.get)
      .put(user.put)
      .delete(user.destroy);





module.exports = router;
