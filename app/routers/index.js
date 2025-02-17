const express = require('express');
const router = express.Router();
const usersRoute = require('./usersRoute') ;
const commentsRoute = require('./commentsRoute') ;


router.use('/users', usersRoute);
router.use('/comments', commentsRoute);

module.exports = router;
