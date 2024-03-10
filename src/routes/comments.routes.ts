import express from 'express'

// Initializations

const router = express.Router()

import  {
  getAllCommentsHandler,
  getCommentsByItemIdHandler,
  postCommentHandler,
  replyCommentHandler,
  deleteCommentHandler,
  editCommentHandler,
  getCommentsByUserIdHandler,
  getCommentByCommentIdHandler
} from '../controllers/comments.controller'

// Endpoint routes

// Get all method (get all)

router.get('/comments/', getAllCommentsHandler)

router.get('/item/:idItemMusic/comments',getCommentsByItemIdHandler) //By ItemMusicID

router.get('/user/:userId/comments',getCommentsByUserIdHandler) //By  UserId

router.get('/comments/:_id',getCommentByCommentIdHandler) //By  CommentId

// Create  comment 
router.post('/comments/', postCommentHandler)

// Edit Comment/Reply

router.patch(`/comments/:_id`,editCommentHandler) 

// Delete comment/Reply (and his sons)
router.delete('/comments/:_id/',deleteCommentHandler)
// Create reply 
router.post('/comments/:parentId/', replyCommentHandler)



// Exportation
module.exports = router

//Likes/dislikes (get y put de la misma ruta)
/*
router.get('/comments/:_id/likes/')
router.get('/comments/:_id/dislikes/')

*/