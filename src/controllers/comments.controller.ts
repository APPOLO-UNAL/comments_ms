import { Request, Response } from "express"
import {
    deleteComment,
    editComment,
    findCommentById,
    findCommentsBy,
    postComment,
    setReactions
} from '../services/commentServices'
const commentController:any = {}


// Get endpoints

export async function getAllCommentsHandler(req : Request,res:Response):Promise<any>  {
    const comments=await findCommentsBy({})
    res.send(comments)
}

export async function getCommentsByItemIdHandler(req : Request,res:Response):Promise<any> {
    
    const {itemMusicId} =req.params;
    const comments =await findCommentsBy({itemMusicId})
    res.send(comments)
}
export async function getCommentsByUserIdHandler(req : Request,res:Response):Promise<any> {
    
    const {userId} =req.params;
    const comments =await findCommentsBy({userId})
    res.send(comments)
}
export async function getCommentByCommentIdHandler(req : Request,res:Response):Promise<any> {
    try{
        const {_id}=req.params
        const comment= await findCommentById({_id})
        res.send(comment)
    }catch(error){
        res.status(400).send(error)
    }
}
export async function getReplies(req : Request,res:Response):Promise<any> {
    try{
        const _id=req.params._id
        const replies= await findCommentsBy({"parentId":_id})
        res.send(replies)
    }catch(error){
        res.status(400).send(error)
    }
}
//      likes and dislikes 
export async function getCommentLikes(req : Request,res:Response):Promise<any> {
    try{
        const {_id}=req.params
        const comment= await findCommentById({_id})
        res.send({"_id":_id,"likes":comment?.likes})
    }catch(error){
        res.status(400).send(error)
    }
}
export async function getCommentDislikes(req : Request,res:Response):Promise<any> {
    try{
        const {_id}=req.params
        const comment= await findCommentById({_id})
        res.send({"_id":_id,"dislikes":comment?.dislikes})
    }catch(error){
        res.status(400).send(error)
    }
}

// Post enpoints

export async function postCommentHandler(req:Request,res:Response):Promise<any>  {
    try{
        const body=req.body
        const commentCreated= await postComment(body)
        res.send(commentCreated)
    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

export async function replyCommentHandler(req:Request,res:Response):Promise<any>  {
    try{
        const parentId=req.params.parentId
        const comment=await findCommentById({"_id":parentId}) //Cast 
        if(!comment){
            res.sendStatus(400)
        }
       const body=req.body
        body.parentId=parentId
        const commentCreated= await postComment(body)
        res.send(commentCreated)
    }catch(error){
        res.status(400).send(error)
    }
    

}
// Likes and Dislikes
export async function giveLikeHandler(req:Request,res:Response):Promise<any>  {
    try{
        reactCommentAuxFunction(req,res,'likes')
    }catch(error){
        res.status(400).send(error)
    }
}
export async function giveDislikeHandler(req:Request,res:Response):Promise<any>  {
    try{
        reactCommentAuxFunction(req,res,'dislikes')
    }catch(error){
        res.status(400).send(error)
    }
}
export async function reactCommentAuxFunction(req:Request,res:Response,reaction:string):Promise<any>  {
   
    const {_id}=req.params
    const {userIdLike,unReact}=req.body
    let commentUpdated:any
    if((unReact as Boolean)){
        commentUpdated=await setReactions({_id}, {$pull:{[reaction]:userIdLike}}) //unlike
    }else{
        const opositeReaction=getOppositeReaction(reaction)
        commentUpdated=await setReactions({_id}, {$addToSet:{[reaction]:userIdLike},$pull:{[opositeReaction]:userIdLike}}) //give like
    }
    res.send(commentUpdated)
    
}

//Patch

export async function editCommentHandler(req:Request,res:Response):Promise<any>  {
    try{
        const {_id}=req.params
        const {content}=req.body
        const comment= await editComment({_id},{content},{new:true})
        res.send(comment)
    }catch(error){
        res.status(400).send(error)
    }
}

//Delete
export async function deleteCommentHandler(req:Request,res:Response):Promise<any>  {
    //res.send(`Deleting  ${req.params.idComment}`)
    const {_id}=req.params
    const resp= await deleteComment({_id})
    
    res.send(resp)
} //Falta cascada

function getOppositeReaction(reaction: string): string {
    if (reaction === "likes") {
      return "dislikes";
    } else if (reaction === "dislikes") {
      return "likes";
    } else {
      throw new Error('Invalid string');
    }
  }