import { FilterQuery,QueryOptions,UpdateQuery } from 'mongoose'
import CommentModel from '../models/CommentModel'
import {CommentDocument,CommentInput} from '../types/types'
export async function findCommentBy(
    query: FilterQuery<CommentDocument>,
    options: QueryOptions={lean:true} //Return as a JSON
) {
    return CommentModel.find(query,{},options).exec()
}

export async function postComment (    input: CommentInput){
    return CommentModel.create(input)
}


