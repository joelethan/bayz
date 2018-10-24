const express = require('express');
const router = express.Router();
var methods = require('../middleware/mothods')

router.post('/login', (req, res, next) => {
    var user = {
        email: req.body.email,
        password: req.body.password
    };
    if (!user || !user.email || !user.password){
        res.status(500).json({
            message: 'Invalid User Credentials'
        });
    }

    res.status(200).json({
        message: 'User successful logged in',
        token: methods.data.tokenGen(user)
    });
});

module.exports = router;