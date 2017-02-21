var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET api rest. */
router.get('/', function(req, res, next) {
    res.json({
        status: 200,
        message: 'api'
    })
});

router.post('/register', function(req, res, next) {
    var user = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mail: req.body.mail,
        password: req.body.password,
        age: req.body.age,
        isAdmin: req.body.admin
    });
    user.save(function(err, user) {
        if (err) {
            res.json(err);
        }
        res.json(user);
    });
});

router.get('/all', function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            res.json(err);
        }
        res.json(users);
    });
});

router.get('/user/:id', function(req, res, next) {
    User.findOne({ _id: req.params.id }, function(err, user) {
        if (err) {
            res.json(err);
        }
        res.json(user);
    });
});

router.delete('/user', function(req, res, next) {
    User.findOneAndRemove({ _id: req.body.id }, function(err, user) {
        if (err) {
            res.json(err);
        }
        res.json(user);
    })
});

router.put('/user', function(req, res, next) {
    User.findByIdAndUpdate({ _id: req.body.id }, {
            $set: req.body
        }, {
            new: true,
        },
        function(err, user) {
            if (err) {
                res.json(err);
            }
            res.json(user);
        })
});

router.post('/', function(req, res, next) {
    res.json(req.body);
});

router.get('/query', function(req, res, next) {
    res.json({
        status: 200,
        data: {
            name: req.query.name,
            age: req.query.age
        }
    });
});

router.get('/:name', function(req, res, next) {
    res.json(req.params)
});

module.exports = router;