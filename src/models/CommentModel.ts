
import  {Schema,model,Document,Date } from 'mongoose';
// const mongoose=require('mongoose');

export interface CommentInput{
    userId:String,
    content:String,
    parentComment:String,
    idItemMusic:String,
    likes:Array<String>,
    dislikes:Array<String>
}
export interface CommentDocument extends CommentInput, Document{
    createdAt: Date,
    updatedAt: Date
}
const commentSchema=new Schema({
    _id :{type:String},
    userId:{type:String,
         required:true}, //Who make the comment
    content:{type:String,required:true}, //Comment content
    parentComment:{type:String,required:false}, //Comment that is being responded 
    idItemMusic:{type:String,required: true},     //Album/Artist/Track Id that is being reviewed
    likes:Array<String>,
    dislikes:Array<String>
},{ 
    timestamps: true , //Date
    collection: 'comments'
}
);


//Exportation

const CommentModel = model<CommentDocument>('Comment',commentSchema)
export  default CommentModel
