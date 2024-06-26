import { Request, Response, raw } from "express"
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
import { send } from '../sender'
import { isValidObjectId } from "mongoose"
// Get endpoints

export async function getAllCommentsHandler(req : Request,res:Response):Promise<any>  {
    const comments=await findCommentsBy({})
    res.send(comments)
}
export async function  getPrincipalCommentsHandler(req : Request,res:Response):Promise<any>  {
    const comments=await findCommentsBy({parentId: null })
    res.send(comments)
}

export async function getCommentsByItemIdHandler(req : Request,res:Response):Promise<any> {
    
    const {itemMusicId} =req.params;
    const comments =await findCommentsBy({itemMusicId,parentId:null})
    res.send(comments)
}
export async function getCommentsByUserIdHandler(req : Request,res:Response):Promise<any> {
    
    const {userId} =req.params;
    const comments =await findCommentsBy({userId,parentId:null})
    res.send(comments)
}
export async function getCommentByCommentIdHandler(req : Request,res:Response):Promise<any> {
    try{
        const {_id}=req.params
        if(!isValidObjectId(_id)){
            throw new Error ("Invalid CommentId")
        }
        const comment= await findCommentById({_id})
        if(!comment){
            throw new Error("The comment doesnt exist");
        }

        res.send(comment)
    }catch(error:any){
        res.status(400).send(error.message ? {message:error.message}: error)
    }
}

export async function getAverageByItemIdHandler(req: Request, res: Response): Promise<any> {
    try {
        const { itemMusicId } = req.params;
        const comments =await findCommentsBy({itemMusicId})
        const promedioString = comments.length
        //Calcular el promedio
        let suma = 0
        for (var comment of comments){
            suma = suma+Number(comment.rate)
        }
        res.json(suma/promedioString);
    } catch (error:any) {
        res.status(400).send(error.message ? {message:error.message}: error)
    }
}


export async function getFollowedComments(req : Request,res:Response):Promise<any> {
    try{
        const users = req.query.userId;
        const replies= await findCommentsBy({userId:{$in:users},parentId:null})
        res.send(replies)
    }catch(error){
        res.status(400).send(error)
    }
}
export async function getReplies(req : Request,res:Response):Promise<any> {
    try{
        const {_id}=req.params
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
                
                // send("Reply", "Someone replied to your comment", parentId).catch((err) => {
                //     console.error("Error:", err);
                //     process.exit(1);
                // });
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
        const {_id}=req.params
        // send("Liked", "Someone liked your comment", _id).catch((err) => {
        //     console.error("Error:", err);
        //     process.exit(1);
        // });
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
        const {rate}=req.body
        const comment= await updateDB({_id},{content,rate})
        res.send(comment)
    }catch(error){
        res.status(400).send(error)
    }
}

//Delete
export async function deleteCommentHandler(req:Request,res:Response):Promise<any>  {
    const {_id}=req.params
    const resp= await deleteComment({_id})
    
    res.send(resp)
} 
export async function deleteCommentByUserHandler(req:Request,res:Response):Promise<any>  {
    const {userId}=req.params
    const comments= await findCommentsBy({userId})
    let resp
    for(const comment of comments){
        resp=await await deleteComment({_id:comment._id})
    }
    res.send(resp)
} 
function getOppositeReaction(reaction: string): string {
    if (reaction === "likes") {
      return "dislikes";
    } else if (reaction === "dislikes") {
      return "likes";
    } else {
      throw new Error('Invalid string');
    }
  }