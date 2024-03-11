
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
        }
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
);
//Indexes
commentSchema.index(
    { idUser: 1, idItem: 1, parentId: 1 },  //Restriction
    { unique: true, partialFilterExpression: { parentId: { $eq: null } } //Cond to restrict
}); //Index just for main Comment

//functions

async function validateIdParent (value: any) { //Unique comment validation function
    if(!Types.ObjectId.isValid(value)){
        return false
    }
    const comment:any = await CommentModel.findById(value);
        return comment !== null;
}
//Hooks


commentSchema.pre('find',{query:false},async function(next){
    
    
})


//Exportation

const CommentModel = model<CommentDocument>('Comment',commentSchema)

export  default CommentModel
