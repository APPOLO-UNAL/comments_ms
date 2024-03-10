import { Request, Response } from "express"
import {
    deleteComment,
    findCommentBy,postComment
} from '../services/commentServices'
const commentController:any = {}

export async function getAllCommentsHandler(req : Request,res:Response):Promise<any>  {
    const comments=await findCommentBy({})
    res.send(comments)
}

export async function getCommentByItemIdHandler(req : Request,res:Response):Promise<any> {
    
    const {idItemMusic} =req.params;
    const comments =await findCommentBy({idItemMusic})
    res.send(comments)
}
export async function getCommentByUserIdHandler(req : Request,res:Response):Promise<any> {
    
    const {userId} =req.params;
    const comments =await findCommentBy({userId})
    res.send(comments)
}
export async function getCommentByCommentIdHandler(req : Request,res:Response):Promise<any> {
    try{
        const {_id}=req.params
        const comment= await findCommentBy({_id})
        res.send(comment)
    }catch(error){
        res.status(400).send(error)
        console.log("xd")
    }
}



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
    res.send(`Responding to ${req.params.idComment}`)
}
export async function editCommentHandler(req:Request,res:Response):Promise<any>  {
    res.send(`Editing  ${req.params.idComment}`)
}
export async function deleteCommentHandler(req:Request,res:Response):Promise<any>  {
    //res.send(`Deleting  ${req.params.idComment}`)
    const {_id}=req.params
    const resp= await deleteComment({_id})
    
    res.send(resp)
}
