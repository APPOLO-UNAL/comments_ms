import { Request, Response } from "express"
import {
    deleteComment,
    editComment,
    findCommentById,
    findCommentsBy,postComment
} from '../services/commentServices'
const commentController:any = {}

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



//Post

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

