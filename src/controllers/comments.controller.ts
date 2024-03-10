import { Request, Response } from "express"
import {
    findCommentBy,postComment
} from '../services/commentServices'
const commentController:any = {}

export async function getCommentHandler(req : Request,res:Response):Promise<any>  {
    res.send('Getting All Comments By Controller')
}

export async function getCommentByItemIdHandler(req : Request,res:Response):Promise<any> {
    
    const {idItemMusic} =req.params;
    const comments =await findCommentBy({idItemMusic})
    console.log(idItemMusic)
    res.send(comments)
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
    res.send(`Deleting  ${req.params.idComment}`)
}
