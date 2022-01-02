const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const reNewTokens = (aToken, user) => {
    const username = {username: user.username};
    const accessToken = jwt.sign(username, user.secretKey1, {expiresIn: config.accessTokenLife});
    user.refreshToken = jwt.sign(username, user.secretKey2, {expiresIn: config.refreshTokenLife});
    user.save();
    return {
        user,
        accessToken
    };
}

const auth = async (req, res, next) => {
    try {
        console.log('auth triggered : ');
        let accessToken = req.get('Authorization'); // получает АТ

        if (!accessToken) {
            res.status(401).send({error: 'Logout'});
            return
        }

        accessToken = accessToken.split(' ')[1];
        const userId = req.get('userId');
        const user = await User.findOne({_id: userId}); //Находит юзера

        if (!user) {
            res.status(401).send({error: 'Logout'});
            return;
        }
        jwt.verify(accessToken, user.secretKey1, function (err, decoded) {

            if (decoded) {
                req.data = reNewTokens(accessToken, user);
                next();
            }

            if (err) {
                if (err.toString() === 'TokenExpiredError: jwt expired') {
                    console.log('error : ', err);
                    req.data = reNewTokens(accessToken, user);
                    next();
                } else {
                    console.log({error: 'Logout'}, err);
                    res.status(401).send({error: 'Logout'});
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = auth;
