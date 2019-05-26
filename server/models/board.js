var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    // document size 16mb 제한 때문에 embedded로 작성하지 않음. 
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const postSchema = new Schema({
    author: {
      id: { type: Schema.Types.ObjectId, ref: 'User' }, 
      name: { type: String, required: true }
    },
    title: { type: String, required: true },
    contents: { type: String, required: true },
    created: { type: Date, default: Date.now },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const commentSchema = new Schema({
    author: {
      id: { type: Schema.Types.ObjectId, ref: 'User' }, 
      name: { type: String, required: true }
    },
    postId : {type: Schema.Types.ObjectId, ref: 'Post'},
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
