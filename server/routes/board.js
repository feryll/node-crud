module.exports = function(router, Board){
    router.get('/', function(request, response){
        response.send("User CRUD REST API is ready");
    });

    router.post('/createUser', Board.createUser);
    router.get('/getUsers', Board.getAllUsers);
    router.get('/getUser/:id', Board.getUser);
    // router.put('/updateUser/:id', Board.updateUser);
    // router.delete('/removeUser/:id', Board.removeUser);
}