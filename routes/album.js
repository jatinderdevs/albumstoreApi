const express = require('express');
const router = express.Router();
const Isauth = require('../middleware/isauth');
const controller = require('../controllers/albumcontroller');
const uploadimg = require('../middleware/uploadimg');


router.get("/", controller.index)

router.post("/create", Isauth, uploadimg.single('img'), controller.create);

router.get("/edit/:id", controller.getedit)

router.post("/edit/:id", uploadimg.single('img'), controller.postedit)

router.delete('/remove/:id', controller.remove)

module.exports = router;