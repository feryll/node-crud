var User = require('../models/board').User;
var Post = require('../models/board').Post;
var Comment = require('../models/board').Comment;

module.exports = {
    createComment : function(request, response){
            var data = new Comment({
                author: request.body.author,
                contents: request.body.contents
            }).save(function(err, comment){
                if(err){
                    console.log("Error in create new comment", err);
                    throw err;
                }
                User.findByIdAndUpdate({ _id : request.body.author.id}, {$push: { comments: comment._id}}, 
                    function(err, post){
                        if(err){
                            console.log("Error in update user because of a new comment", err);
                            throw err;
                        }
                    }
                );
                response.json(comment);
            });
    },

    getCommentsByAuthorId : function(request, response){
        Comment.find({ 'author.id' : request.params.id}, function(err, comments){
            if(err){
                console.log("Error in fetching comments", err);
                throw err;
            }

            response.json(comments);
        });
    },

    getCommentsByPostId : function(request, response){
        Comment.find({ postId : request.params.id}, function(err, comments){
            if(err){
                console.log("Error in fetching comments", err);
                throw err;
            }

            response.json(comments);
        });
    },

    updateComment : function(request, response){
        Comment.findByIdAndUpdate({ _id : request.params.id},{$set: request.body},{new : true} , function(err, comment){
            if(err){
                console.log("Error in updating single item of comment", err);
                throw err;
            }

            response.json(comment);
        });
    },

    removeComment : function(request, response){
        Comment.findByIdAndRemove({ _id : request.params.id}, function(err, comment){
            if(err){
                console.log("Error in removing single item of comment", err);
                throw err;
            }

            // 해당 comment의 작성자의 comments 필드 갱신
            User.findByIdAndUpdate({ _id : comment.author.id}, {$pull: { comments: comment._id}}, 
                function(err, user){
                    if(err){
                        console.log("Error in update user because of deleting a comment", err);
                        throw err;
                    }
                    response.json(user);
                }
            );
        });
    }
}