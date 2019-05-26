module.exports = function(router,User){
    router.get('/', function(request, response){
        response.send("User CRUD REST API is ready");
    });

    router.post('/createUser', User.create);
    router.get('/getUsers', User.getAll);
    router.get('/getUser/:id', User.getUser);
    router.put('/updateUser/:id', User.updateUser);
    router.delete('/removeUser/:id', User.removeUser);
}