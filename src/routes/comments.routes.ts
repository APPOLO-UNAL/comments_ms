import express from 'express'

// Initializations

const router = express.Router()

import  {
  getCommentHandler,
  getCommentByItemIdHandler,
  postCommentHandler,
  replyCommentHandler,
  deleteCommentHandler,
  editCommentHandler
} from '../controllers/comments.controller'

// Endpoint routes

// Get all method (get all)

router.get('/comments', getCommentHandler)

//Get all Item comments 

router.get('/:idItemMusic/comments',getCommentByItemIdHandler)
// Create  comment 
router.post('/comments/', postCommentHandler)

// Edit Comment/Reply

router.put(`/comments/:idComment`,editCommentHandler) 

// Delete comment/Reply (and his sons)
router.delete('/comments/:idComment',deleteCommentHandler)
// Create reply 
router.post('/:idItem/comments/:idComment/', replyCommentHandler)



// Exportation
module.exports = router
