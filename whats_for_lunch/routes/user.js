'use strict';
//requirements
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const user = require('../controllers/users_controller');
const food = require('../controllers/food_controller');
const auth = require('../controllers/auth_controller');

// router.use('/user', auth.varify);
router.route('/user')
      .post(user.create)
      .get(user.get);

router.route('/user/:id')
      .get(user.getOneUser)
      .put(user.put)
      .delete(user.destroy);

router.route('/food')
      .get(food.retrieve)
      
router.route('/authenticate')
      .post(auth.post);


      // .use(auth.varify)






module.exports = router;
