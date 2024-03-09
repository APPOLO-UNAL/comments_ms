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