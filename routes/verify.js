var User = require("../models/users");
var jwt = require('jsonwebtoken');

exports.getToken = function(user) {
    return jwt.sign(user, "keysecret");
}

exports.verifyUser = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'keysecret', function(err, decoded) {
            if (err) {
                res.json(err);
            }
            req.decoded = decoded;
            next();
        });
    } else {
        res.json("No Token");
    }
}