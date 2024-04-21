import express from 'express'

// Initializations

const router = express.Router()

import  {
  getAllCommentsHandler,
  getCommentsByItemIdHandler,
  getAverageByItemIdHandler,
  postCommentHandler,
  replyCommentHandler,
  deleteCommentHandler,
  editCommentHandler,
  getCommentsByUserIdHandler,
  getCommentByCommentIdHandler,
  getReplies,
  getCommentLikes,
  getCommentDislikes,
  giveLikeHandler,
  giveDislikeHandler,
  deleteCommentByUserHandler

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

router.get('/av/:itemMusicId/',getAverageByItemIdHandler)

// Create  comment 
router.post('/comments/', postCommentHandler)

// Edit Comment/Reply

router.patch(`/comments/:_id`,editCommentHandler) 

router.patch('/comments/:_id/likes/', giveLikeHandler)
router.patch('/comments/:_id/dislikes/',giveDislikeHandler)

// Delete comment/Reply (and his sons)
router.delete('/comments/:_id/',deleteCommentHandler)
//Delete by userID
router.delete('/user/:userId/comments/',deleteCommentByUserHandler)
// Create reply 
router.post('/comments/:parentId/', replyCommentHandler)



// Exportation
module.exports = router

//Likes/dislikes (get y put de la misma ruta)
/*


*/