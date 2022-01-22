const express = require('express');
const dotenv = require("dotenv").config();
const aut = require('../middleware/aut');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {nanoid} = require("nanoid");
const config = require('../config');
const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const sendEmail = async (email, pass) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'agregator.app@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const mailOptions = {
            from: 'Админ Agregator < agregator.app@gmail.com >',
            to: email,
            subject: 'Смена пароля в Agregator',
            text: `Это ваш новый пароль ${pass}. после входа в личный кабинет смените его на новый`,
            html: `<p>Это ваш новый пароль : <h3>${pass} </h3>. после входа в личный кабинет смените его на новый</p>>`
        }

        return  await transport.sendMail(mailOptions)
    } catch (e) {
        console.log('sending email error ; ', e);
        return  e
    }
}

const responseFunc = async (res, user, successMsg) => {
    try {
        const username = {username: user.username};
        const accessToken = jwt.sign(username, user.secretKey1, {expiresIn: config.accessTokenLife});
        user.refreshToken = jwt.sign(username, user.secretKey2, {expiresIn: config.refreshTokenLife});
        res.header('Authorization', 'Bearer ' + accessToken);
        await user.save();
        res.status(201).send({user: user, success: successMsg});
    } catch(e) {
        console.log(e);
        res.status(400).send({error: e});
    }
}

router.post('/', async (req, res) => { //register new user
    try {
        let newUser = new User(req.body.user);

        newUser.secretKey1 = nanoid();
        newUser.secretKey2 = nanoid();
        await responseFunc(res, newUser, 'Вы зарегистрировались !')

        // const accessToken = jwt.sign(username, newUser.secretKey1, {expiresIn: config.accessTokenLife});
        // newUser.refreshToken = jwt.sign(username, newUser.secretKey2, {expiresIn: config.refreshTokenLife});
        // res.header('Authorization', 'Bearer ' + accessToken);
        // await newUser.save();
        // res.status(201).send({user: newUser, success: 'Вы зарегистрировались !'});
    } catch (e) {
        res.status(400).send(e);
    }
});

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

        await responseFunc(res, user, 'Добро пожаловать !')

        /*const accessToken = jwt.sign(username, user.secretKey1, {expiresIn: config.accessTokenLife});
        user.refreshToken = jwt.sign(username, user.secretKey2, {expiresIn: config.refreshTokenLife});
        await user.save();
        res.header('Authorization', 'Bearer ' + accessToken);
        res.status(202).send({user: user, success: 'Добро пожаловать !'});*/
    } catch (e) {
        console.log(e);
        res.status(400).send({error: e});
    }
});

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

router.put('/', aut, async (req, res) => {
    try {
        const reqBody = req.body;
        let reqData = req.data;
        let user = await User.findOne({_id: reqData.user._id}); //Находит юзера

        const isMatch = await user.checkPassword(reqBody.oldPass);
        if (!isMatch) {
            return res.status(403).send({error: 'Logout'});
        }
        user.password = reqBody.newPass;

        res.header('Authorization', 'Bearer ' + user.accessToken);
        await user.save();
        return res.status(201).send({user: user, success: 'Пароль изменен !'}); //для личного кабинете всегда должен быть отправлен user
    }  catch (e) {
        console.log(e);
        return res.send(e);
    }
});

router.post('/email', async (req, res) => {
    try {
        const email = req.body.email;
        console.log('email received : ', email);
        const user = await User.findOne({email});
        console.log('user : ', user);
        if (!user) {
            return res.status(401).send({error: 'Этот email не зарегистрирован !'});
        }
        const password = nanoid();
        user.password = password;
        await user.save();
        console.log('new user : ', user);
        await sendEmail(password).then().catch(e => console.log('email sending error : ', e.message));

        return res.status(201).send({success: 'Проверьте свою почту !'});
    }  catch (e) {
        console.log(e);
        return res.send(e);
    }
});

module.exports = router;
