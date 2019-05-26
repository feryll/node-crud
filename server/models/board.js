var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

const postSchema = new Schema({
    id: { type: String, required: true, unique: true },
    writer: { type: String, required: true },
    title: { type: String, required: true },
    contents: { type: String, required: true },
    created: { type: Date, default: Date.now },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const commentSchema = new Schema({
    id: { type: String, required: true, unique: true },
    writer: { type: String, required: true },
    contents: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

var userModel = mongoose.model('User',userSchema);
var postModel = mongoose.model('Post',postSchema);
var commentModel = mongoose.model('Comment',commentSchema);

module.exports = {
    User : userModel,
    Post : postModel,
    Comment : commentModel
};
