const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {nanoid} = require("nanoid");
const config = require('../config');
const nodemailer = require("nodemailer");
const {google} = require("googleapis");

const CLIENT_ID = '306550625882-8sqsmi5ghghqn04jeh8ek61lulhhqb32.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.goole.com/oauthplayground';
const REFRESH_TOKEN = '1//04utVJwsFlY61CgYIARAAGAQSNwF-L9IrGlw6rezS0juYbZNcjwJ2xDnsWzq4bxF3__K9GzY2Bgmh5IUfr2j-9uEfaSPP0JZ5JXk';
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

async function sendEmail () {
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
            from: 'Agregator admin < agregator.app@gmail.com >',
            to: 'maksatovy@gmail.com',
            subject: 'Привет Тест',
            text: 'Привет от нод майл',
            html: '<h3>Привет от ХТМЛ тэгов</h3>>'
        }

        return  await transport.sendMail(mailOptions)
    } catch (e) {
        return  e
    }
}

sendEmail().then(res => console.log('Email sent ... : ', res)).catch(e => console.log('email sending error : ', e.message))

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

router.put('/', async (req, res) => {
    try {
        const email = req.body.email;
        console.log('email received : ', email);
        const user = await User.findOne({email});
        console.log('user : ', user);
        if (!user) {
            console.log('email found : ', user);
            return res.status(401).send({error: 'Этот email не зарегистрирован !'});
        }
        // await req.user.save();
        return res.status(201).send({success: 'Проверьте свою почту !'});
    }  catch (e) {
        return res.send(e);
    }
});

module.exports = router;
