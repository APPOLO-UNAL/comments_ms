export interface CommentInput{

    userId:String,
    content:String,
    rate: Number,
    parentId:String,
    itemMusicId:String,
    likes:Array<String>,
    dislikes:Array<String>
}
export interface CommentDocument extends CommentInput, Document{
    createdAt: Date,
    updatedAt: Date
}