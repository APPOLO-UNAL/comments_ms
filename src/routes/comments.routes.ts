import express from 'express'

// Initializations

const router = express.Router()

import  {
  getAllCommentsHandler,
  getCommentByItemIdHandler,
  postCommentHandler,
  replyCommentHandler,
  deleteCommentHandler,
  editCommentHandler,
  getCommentByUserIdHandler,
  getCommentByCommentIdHandler
} from '../controllers/comments.controller'

// Endpoint routes

// Get all method (get all)

router.get('/comments/', getAllCommentsHandler)

//Get all Item comments 

router.get('/item/:idItemMusic/comments',getCommentByItemIdHandler) //By ItemMusicID

router.get('/user/:userId/comments',getCommentByUserIdHandler) //By  UserId

router.get('/comments/:_id',getCommentByCommentIdHandler) //By  CommentId

// Create  comment 
router.post('/comments/', postCommentHandler)

// Edit Comment/Reply

router.put(`/comments/:_id`,editCommentHandler) 

// Delete comment/Reply (and his sons)
router.delete('/comments/:_id/',deleteCommentHandler)
// Create reply 
router.post('/comments/:_id/', replyCommentHandler)



// Exportation
module.exports = router
