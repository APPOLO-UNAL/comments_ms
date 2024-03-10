import { FilterQuery,QueryOptions,UpdateQuery } from 'mongoose'
import CommentModel from '../models/CommentModel'
import {CommentDocument,CommentInput} from '../models/types'
export async function findCommentBy(
    query: FilterQuery<CommentDocument>,
    options: QueryOptions={lean:true} //Return as a JSON
) {
    return CommentModel.find(query,{},options).exec()
}

export async function postComment (    input: CommentInput){
    return CommentModel.create(input)
}

export async function deleteComment( query: FilterQuery<CommentDocument>){
    return CommentModel.deleteOne(query)
}



