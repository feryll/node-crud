var User = require('../models/board').User;
var Post = require('../models/board').Post;
var Comment = require('../models/board').Comment;

module.exports = {
    createUser : function(request, response){
            var data = new User({
                id : request.body.id,
                name : request.body.name
            }).save(function(err, user){
                if(err){
                    console.log("Error in create new user", err);
                    throw err;
                }

                response.json(user);
            });
    },

    getAllUsers : function(request,response){
            User.find({}, function(err, users){
                if(err){
                    console.log("Error in fetching the list of users ", err);
                    throw err;
                }

                response.json(users)
            });
    },

    // for debugging
    clearComments : function(request,response){
        User.findByIdAndUpdate({ _id : request.params.id}, {$set: { comments: []}}, function(err, user){
            if(err){
                console.log("Error in fetching single item of user ", err);
                throw err;
            }

            response.json(user);
        });
    },

    getUser : function(request, response){
        User.findById({ _id : request.params.id}, function(err, user){
            if(err){
                console.log("Error in fetching single item of user ", err);
                throw err;
            }

            response.json(user);
        });
    }

}