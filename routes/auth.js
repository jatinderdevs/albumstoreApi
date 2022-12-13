const express = require('express');
const router = express.Router();
const controller = require('../controllers/authcontroller');


router.post('/register', controller.postregister);

router.post('/signin', controller.postsignin);



module.exports = router;