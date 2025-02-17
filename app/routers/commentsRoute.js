const express = require('express');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

router.get('/', commentsController.getAllComments)
router.get('/count', commentsController.getAllCommentsCount)
router.get('/:id', commentsController.getCommentById)
router.post('/', commentsController.createComment)
router.delete('/', commentsController.deleteComment)
router.put('/', commentsController.updateComment)

module.exports = router;