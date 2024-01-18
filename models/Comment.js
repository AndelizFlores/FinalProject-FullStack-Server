const { model, Schema } = require('mongoose')

const commentSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User"},
    comment: String
},{
    timestamps: true
})

module.export = model("Comment", commentSchema)