"use strict"; 

let mongojs = require('mongojs');

module.exports = function(router, passport, config){

    let db = mongojs(config.db_endpoint, ['users']);

    // Get All Users
    router.get('/users', function(req, res, next){
        db.users.find(function(err, users){
            if(err){
                res.send(err);
            }
            res.json(users);
        });
    });

    //Create User
    router.post('/user', function(req, res, next){
        passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/falledurl',
            failureFlash: true
        })(req, res, next);
    });
};

