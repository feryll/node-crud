
module.exports = function(router, Board){
    router.get('/', function(request, response){
        response.send("Board(User, Post, Comment) CRUD REST API is ready");
    });

    router.post('/createUser', Board.createUser);
    router.get('/getUser', Board.getAllUsers);
    router.get('/getUser/:id', Board.getUser);
    router.post('/createPost', Board.createPost);
    router.get('/getPosts/:id', Board.getPosts);
    router.put('/updatePost/:id', Board.updatePost);
    router.delete('/removePost/:id', Board.removePost);
}