import { Request, Response } from "express"
import {
    deleteComment,
    updateDB,
    findCommentById,
    findCommentsBy,
    postComment,
} from '../services/commentServices'
const commentController:any = {}

import {MongoServerError} from 'mongodb'
import { CommentDocument } from "../models/types"
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
    }catch(error:any){
        res.status(400).send(error.message ? {message:error.message}: error)
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
    }catch(error:any){
        if(error?.code === 11000){
            res.status(400).send({message:'Duplicate key error'})
        }else{
            res.status(400).send(error.message ? {message:error.message}: error)
        }
        
    }
}

export async function replyCommentHandler(req:Request,res:Response):Promise<any>  {
    try{
        const parentId=req.params.parentId
        const comment=await findCommentById({"_id":parentId}) //Cast 
        if(!comment){
            res.status(400).send({message:`The idparent doesnt exist in database`})  
        }else{
            if(!comment.parentId){
                const body=req.body
                body.parentId=parentId
                const commentCreated= await postComment(body)
                res.send(commentCreated)
            }else{
                throw new Error("You cant reply to a reply")
            }
            
        }
    }catch(error:any){
        res.status(400).send(error.message ? {message:error.message}: error)
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
        commentUpdated=await updateDB({_id}, {$pull:{[reaction]:userIdLike}}) // un react
    }else{
        const opositeReaction=getOppositeReaction(reaction)
        commentUpdated=await updateDB({_id}, {$addToSet:{[reaction]:userIdLike},$pull:{[opositeReaction]:userIdLike}}) // react
    }
    res.send(commentUpdated)
    
}

//Patch

export async function editCommentHandler(req:Request,res:Response):Promise<any>  {
    try{
        const {_id}=req.params
        const {content}=req.body
        const comment= await updateDB({_id},{content})
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