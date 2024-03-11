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
  getCommentByCommentIdHandler,
  getReplies,
  getCommentLikes,
  getCommentDislikes
} from '../controllers/comments.controller'

// Endpoint routes

// Get endpoints

router.get('/comments/', getAllCommentsHandler) //Get all coments

router.get('/item/:itemMusicId/comments/',getCommentsByItemIdHandler) //By ItemMusicID

router.get('/user/:userId/comments/',getCommentsByUserIdHandler) //By  UserId

router.get('/comments/:_id/',getCommentByCommentIdHandler) //By  CommentId

router.get('/comments/:_id/replies/',getReplies)

router.get('/comments/:_id/likes/', getCommentLikes)
router.get('/comments/:_id/dislikes/',getCommentDislikes)

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


*/