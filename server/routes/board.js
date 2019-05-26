
module.exports = function(router, DAO){
    router.get('/', function(request, response){
        response.send("Board(User, Post, Comment) CRUD REST API is ready");
    });

    router.post('/createUser', DAO.user.createUser);
    router.get('/getUser', DAO.user.getAllUsers);
    router.get('/getUser/:id', DAO.user.getUser);

    router.post('/createPost', DAO.post.createPost);
    router.get('/getPosts/:id', DAO.post.getPosts);
    router.put('/updatePost/:id', DAO.post.updatePost);
    router.delete('/removePost/:id', DAO.post.removePost);

    router.post('/createComment', DAO.comment.createComment);
    router.get('/getCommentsByAuthorId/:id', DAO.comment.getCommentsByAuthorId);
    router.get('/getCommentsByPostId/:id', DAO.comment.getCommentsByPostId);
    router.put('/updateComment/:id', DAO.comment.updateComment);
    router.delete('/removeComment/:id', DAO.comment.removeComment);
}