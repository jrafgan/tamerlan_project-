const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const reNewTokens = (user) => {
    const username = {username: user.username};
    const accessToken = jwt.sign(username, user.secretKey1, {expiresIn: config.accessTokenLife});
    user.refreshToken = jwt.sign(username, user.secretKey2, {expiresIn: config.refreshTokenLife});
    user.save();
    return {
        user,
        accessToken
    };
}

const aut = async (req, res, next) => {
    try {
        let accessToken = req.get('Authorization'); // получает АТ
        accessToken = accessToken.split(' ')[1];

        if (!accessToken) {
            res.status(401).send({error: 'Logout'});
            return
        }
        const userId = req.get('userId');
        const user = await User.findOne({_id: userId}); //Находит юзера

        if (!user) {
            res.status(401).send({error: 'Logout'});
            return;
        }
        jwt.verify(accessToken, user.secretKey1, async function (err, decoded) {

            if (decoded) {
                req.data = await reNewTokens(user);
                next();
            }

            if (err) {
                if (err.toString() === 'TokenExpiredError: jwt expired') {
                    console.log('error : ', err);
                    req.data = reNewTokens(user);
                    next();
                } else {
                    console.log('another err : ', err);
                    res.status(401).send({error: 'Logout'});
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = aut;
