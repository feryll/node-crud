var User = require('../models/board').User;
var Post = require('../models/board').Post;
var Comment = require('../models/board').Comment;

module.exports = {
    createPost : function(request, response){
            var data = new Post({
                author: request.body.author,
                title: request.body.title,
                contents: request.body.contents
            }).save(function(err, post){
                if(err){
                    console.log("Error in create new post", err);
                    throw err;
                }
                User.findByIdAndUpdate({ _id : request.body.author.id}, {$push: { posts: post._id}}, 
                    function(err, post){
                        if(err){
                            console.log("Error in update user because of a new post", err);
                            throw err;
                        }
                    }
                );
                response.json(post);
            });
    },

    getPosts : function(request, response){
        Post.find({ 'author.id' : request.params.id}, function(err, posts){
            if(err){
                console.log("Error in fetching posts", err);
                throw err;
            }

            response.json(posts);
        });
    },

    updatePost : function(request, response){
        Post.findByIdAndUpdate({ _id : request.params.id},{$set: { title: request.body.title, contents: request.body.contents}},{new : true} , function(err, post){
            if(err){
                console.log("Error in updating single item of post", err);
                throw err;
            }

            response.json(post);
        });
    },

    removePost : function(request, response){
        Post.findByIdAndRemove({ _id : request.params.id}, function(err, post){
            if(err){
                console.log("Error in removing single item of post", err);
                throw err;
            }

            // post에 속한 모든 comments 삭제 
            Comment.find({ postId: post._id}).remove(function(err) {
                if(err) {
                    console.log("Error in removing all comments of post", err);
                    throw err;
                }
            });

            // 해당 post의 작성자의 posts 필드 갱신
            User.findByIdAndUpdate({ _id : post.author.id}, {$pull: { posts: post._id}}, 
                function(err, user){
                    if(err){
                        console.log("Error in update user because of deleting a post", err);
                        throw err;
                    }
                    response.json(user);
                }
            );

            // 위 코멘트 작성자들의 comments 필드 갱신
            User.updateMany({"_id": {$in: post.commentsAuthor}}, {$pull:{ comments: {$in: post.commentsId} }}, function(err) {
                if(err) {
                    console.log("Error in update user because of deleting a post", err);
                    throw err;
                }
            });
        });
    }
}