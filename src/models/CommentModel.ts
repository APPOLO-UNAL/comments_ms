
import  {Schema,model,Document,Date } from 'mongoose';
// const mongoose=require('mongoose');
import {CommentDocument} from '../types/types'

const commentSchema=new Schema({
    _id :Schema.Types.ObjectId,
    userId:{
        type:String,
         required:true}, //Who make the comment
    content:{
        type:String,
        required:true}, //Comment content
    parentComment:{
        type:String,
        required:false}, //Comment that is being responded 
    idItemMusic:{
        type:String,
        required: true},     //Album/Artist/Track Id that is being reviewed
    likes:{
        type: Array
    },
    dislikes:Array<String>
},{ 
    timestamps: true , //Date
    collection: 'comments'
}
);


//Exportation

const CommentModel = model<CommentDocument>('Comment',commentSchema)
export  default CommentModel
