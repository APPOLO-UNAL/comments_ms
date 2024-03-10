import { FilterQuery,QueryOptions,UpdateQuery } from 'mongoose'
import CommentModel from '../models/CommentModel'
import {CommentDocument,CommentInput} from '../models/types'
export async function findCommentsBy(
    query: FilterQuery<CommentDocument>,
    options: QueryOptions={lean:true} //Return as a JSON
) {
    return CommentModel.find(query,{},options).exec()
}
export async function findCommentById(
    query: FilterQuery<CommentDocument>,
    options: QueryOptions={lean:true} //Return as a JSON
) {
    return CommentModel.findById(query,{},options).exec()
}



export async function postComment (    input: CommentInput){
    //input.parentId=""; //
    return CommentModel.create(input)
}

export async function editComment ( 
    query: FilterQuery<CommentDocument>,
    update:UpdateQuery<CommentDocument>,
    options: QueryOptions
){
    //input.parentId=""; //
    
    return CommentModel.findOneAndUpdate(query,update,options)
}

export async function deleteComment( query: FilterQuery<CommentDocument>){
    return CommentModel.deleteOne(query)
}



