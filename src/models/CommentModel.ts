
import  {Schema,model,Document,Date,Types } from 'mongoose';
// const mongoose=require('mongoose');
import {CommentDocument} from './types'

var commentSchema=new Schema({
    userId:{
        type:String,
         required:true}, //Who make the comment
    content:{
        type:String,
        required:true}, //Comment content
    parentId:{
        type:String,
        validate:{
            validator:validateIdParent,
            message:"The parent comment does not exist, please try again"
        }, default: null
    }, 
    itemMusicId:{
        type:String,
        required: true},     //Album/Artist/Track Id that is being reviewed
    likes:{
        type: Array
    },
    dislikes:{
        type:Array,
    }
},{ 
    timestamps: true , //Date
    collection: 'comments'
}
)

// commentSchema.index(
//     { idUser: 1, idItem: 1,parentId: 1}, 
//     { unique: true, partialFilterExpression: { parentId: { $eq: null } } 
// }); 
//Indexes

//functions

async function validateIdParent (value: any) { //Unique comment validation function
    if(!value){
        return true
    }
    if(!Types.ObjectId.isValid(value)){
        return false
    }
    const comment:any = await CommentModel.findById(value);
        return comment !== null;
}
//Hooks

commentSchema.pre('deleteOne',async function(next){
    const _id=await this.clone().getQuery()._id
    const comments= await CommentModel.find({parentId:_id},{},{lean:true}) 
    for(const comment of comments){
        await CommentModel.deleteOne({_id:comment._id})
    }
    next()
 })



//Exportation

const CommentModel = model<CommentDocument>('Comment',commentSchema)

export  default CommentModel
