var User = require('../models/board').User;
var Post = require('../models/board').Post;
var Comment = require('../models/board').Comment;

module.exports = {
    createUser : function(request, response){
            var data = new User({
                name : request.body.name,
                description : request.body.description
            }).save(function(err, user){
                if(err){
                    console.log("Error in create new user", err);
                    throw err
                }

                response.json(user);
            })
    },

    getAllUsers : function(request,response){
            User.find({}, function(err, users){
                if(err){
                    console.log("Error in fetching the list of users ", err);
                    throw err;
                }

                response.json(users)
            })
    },

    getUser : function(request, response){
        User.findById({ _id : request.params.id}, function(err, user){
            if(err){
                console.log("Error in fetching single item of user ", err);
                    throw err;
            }

            response.json(user);
        })
    },

    /* 
     * 사용자는 업데이트와 삭제를 지원하지 않는다.
     */
    // updateUser : function(request, response){
    //         User.findByIdAndUpdate({ _id : request.params.id},{$set: request.body},{new : true} , function(err, user){
    //             if(err){
    //             console.log("Error in updating single item of user ", err);
    //                 throw err;
    //         }

    //         response.json(user);
    //         })
    // },

    // removeUser : function(request, response){
    //         User.findByIdAndRemove({ _id : request.params.id}, function(err, user){
    //             if(err){
    //             console.log("Error in removing single item of user ", err);
    //                 throw err;
    //         }


    //         User.find({},function(err, users){
    //             if(err){
    //                 console.log("Error in fetching the list of users ", err);
    //                 throw err;
    //             }

    //             response.json(users)
    //         })


    //         })
    // }
}