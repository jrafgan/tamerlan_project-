const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {nanoid} = require("nanoid");
const config = require('../config');

router.post('/', async (req, res) => { //register new user
    try {
        let newUser = new User(req.body.user);
        const username = {username: newUser.username};
        const password = {password: newUser.password};
        const secretKey1 = nanoid();
        const secretKey2 = nanoid();
        newUser.secretKey1 = secretKey1;
        newUser.secretKey2 = secretKey2;
        const accessToken = jwt.sign(username, newUser.secretKey1, {expiresIn: config.accessTokenLife});

        newUser.refreshToken = jwt.sign(username, newUser.secretKey2, {expiresIn: config.refreshTokenLife});

        res.header('Authorization', 'Bearer ' + accessToken);
        await newUser.save();
        res.status(201).send({user: newUser, success: 'Вы зарегистрировались !'});
    } catch (e) {
        res.status(400).send(e);
    }
});

//todo этот роут для писем юзеров

// router.post('/message', async (req, res) => {
//     try {
//         const loginUser = req.body.user;
//         const username = {username: loginUser.username};
//         let user = await User.findOne(username);
//
//         if (!user) {
//             return res.status(400).send({error: 'User does not exist'});
//         }
//
//         const isMatch = await user.checkPassword(loginUser.password);
//
//         if (!isMatch) {
//             return res.status(403).send({error: 'Password or login is incorrect'});
//         }
//
//         const accessToken = jwt.sign(username, user.secretKey1, {expiresIn: config.accessTokenLife});
//         user.refreshToken = jwt.sign(username, user.secretKey2, {expiresIn: config.refreshTokenLife});
//         await user.save();
//         res.header('Authorization', 'Bearer ' + accessToken);
//
//         return res.status(202).send({user: user});
//     } catch (e) {
//         console.log('login err : ', e);
//         return res.status(400).send({error: e});
//     }
// });

router.post('/sessions', async (req, res) => { //login user
    try {
        const loginUser = req.body.user;
        const username = {username: loginUser.username};
        let user = await User.findOne(username);

        if (!user) {
            return res.status(400).send({error: 'Такой пользователь не существует !'});
        }

        const isMatch = await user.checkPassword(loginUser.password);

        if (!isMatch) {
            return res.status(403).send({error: 'Неправильный логин или пароль !'});
        }

        const accessToken = jwt.sign(username, user.secretKey1, {expiresIn: config.accessTokenLife});
        user.refreshToken = jwt.sign(username, user.secretKey2, {expiresIn: config.refreshTokenLife});
        await user.save();
        res.header('Authorization', 'Bearer ' + accessToken);

        res.status(202).send({user: user, success: 'Добро пожаловать !'});
    } catch (e) {
        console.log('login err : ', e);
        res.status(400).send({error: e});
    }
});

// router.patch('/', auth, async (req, res) => {
//     try {
//
//         res.header('Authorization', 'Bearer ' + req.data.accessToken);
//
//         return res.status(202).send({info: 'ATrfrshd'});
//     } catch (e) {
//         return res.send({error: e});
//     }
// });

router.post('/logout', async (req, res) => {
    try {
        const id = {_id: req.body.user.id};
        const user = await User.findOne(id);

        user.refreshToken = jwt.sign({username: user.username}, user.secretKey2, {expiresIn: config.refreshTokenLife});
        await user.save();
        res.status(202).send({success: 'Вы вышли !'});
    } catch (e) {
        res.send(e);
    }
});
// todo здесь идет изменение Пароля юзера. Подключить эту фичу тоже

// router.put('/', auth, async (req, res) => {
//     try {
//         req.user.password = req.body.user.password;
//
//         await req.user.save();
//         return res.status(201).send({message: 'Password successfully changed !'});
//     }  catch (e) {
//         return res.send(e);
//     }
// });

module.exports = router;
