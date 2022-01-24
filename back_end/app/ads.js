const express = require('express');
const router = express.Router();
const aut = require('../middleware/aut');
const Ad = require('../models/Ad');
const Message = require('../models/Message');
const User = require('../models/User');

const checkNewAds = async (reqData, successMsg, res) => {
    let ads;
    if (reqData.user.username === 'admiN01') {
        ads = await Ad.find({moderated: false});
        if (ads.length === 0) return res.send({user: reqData.user, success: 'Нет новых объявлений.'});
    } else {
        ads = await Ad.find({user_id: reqData.user._id});
        if (ads.length === 0) return res.send({user: reqData.user, success: 'У вас нет объявлений.'});
    }
    res.header('Authorization', 'Bearer ' + reqData.accessToken);
    res.status(200).send({advs: ads, user: reqData.user, success: successMsg});
}

router.patch('/', aut, async (req, res) => {
    try {
        const newData = req.body;
        const reqData = req.data;
        res.header('Authorization', 'Bearer ' + reqData.accessToken);
        const update = {...newData};
        const opts = { returnOriginal: false };
        await Ad.findByIdAndUpdate(newData.id, update, opts);
        await checkNewAds(reqData, 'Объявление изменено.', res);
        // let ads;
        // if (reqData.user.username === 'admiN01') {
        //     ads = await Ad.find({moderated: false});
        //     if (ads.length === 0) return res.send({success: 'Нет новых объявлений.'});
        // } else {
        //     ads = await Ad.find({user_id: reqData.user._id});
        //     if (ads.length === 0) return res.send({success: 'У вас нет объявлений.'});
        // }
        //
        // res.status(200).send({advs: ads, user: reqData.user, success: 'Объявление изменено.'});
    } catch (e) {
        console.log(e);
        res.status(400).send({error: 'Ой! Не получилось изменить.'});
    }
});

router.get('/', async (req, res) => {
    try {
        let advs = await Ad.find({moderated: true, paid: false});
        let paidAdvs = await Ad.find({moderated: true, paid: true});
        if (advs.length === 0) return res.send({error: 'Новых объявлений нет.'});
        res.send({advs, paidAdvs, success: 'Рад видеть вас !'});
    } catch (e) {
        console.log(e);
        res.status(400).send({error: 'Ой! Что-то не так.'});
    }
});

router.get('/user', aut, async (req, res) => {
    try {
        const reqData = req.data;

        res.header('Authorization', 'Bearer ' + reqData.accessToken);
        const id = reqData.user._id;
        const username = reqData.user.username;
        let ads;
        if (username === 'admiN01') {
            ads = await Ad.find({moderated: false});
        } else {
            ads = await Ad.find({user_id: id});
        }
        if (ads.length === 0) return res.send({user: reqData.user, success: 'У вас нет объявлений.'});

        res.send({advs: ads, user: reqData.user});
    } catch (e) {
        console.log(e);
        res.status(400).send({error: 'Ой! Что-то не так.'});
    }
});

router.post('/', aut, async (req, res) => {
    try {
        const reqData = req.data;
        res.header('Authorization', 'Bearer ' + reqData.accessToken);
        const adsData = new Ad({...req.body, user_id: reqData.user._id});
        await adsData.save();
        const ads = await Ad.find({user_id: reqData.user._id});

        res.status(200).send({advs: ads, user: reqData.user, success: 'Объявление создано.'});
    } catch (e) {
        console.log(e);
        res.status(400).send({error: ' Ой! Не получилось создать объявление.'});
    }
});

// router.post('/sendmsg', aut, async (req, res) => {
//     try {
//         let msgData = req.body;
//         let reqData = req.data;
//         res.header('Authorization', 'Bearer ' + reqData.accessToken);
//
//         let recipient;
//         if (msgData.toUser === 'admiN01') {
//             recipient = await User.findOne({username: 'admiN01'});
//             msgData.toUserId = recipient._id;
//             msgData.toUsername = 'admiN01';
//         } else {
//             recipient = await User.findOne({_id: msgData.toUserId});
//             msgData.toUserId = msgData.toUser;
//             msgData.toUsername = recipient.username;
//         }
//
//         const newMsg = await new Message(msgData);
//
//         console.log('msg data : ', newMsg);
//         const inboxMsgs = await Message.find({toUserId: msgData.fromUserId});
//         // const sentMsgs = await Message.find({toUserId: msgData.fromUserId});
//
//         return res.status(202).send({user: reqData.user, inboxMsgs, success: 'Сообщение отправлено !'});
//     } catch (e) {
//         console.log('message save err : ', e);
//         return res.status(400).send({error: e});
//     }
// });

router.delete('/:id', aut, async (req, res) => {
    try {
        const id = req.params.id;
        const reqData = req.data;
        console.log('reqparams id delete : ', id);
        res.header('Authorization', 'Bearer ' + reqData.accessToken);

        await Ad.findByIdAndDelete(id, function (err, docs) {
            if (err){
                console.log(err);
                return res.status(400).send({error: 'Ой! Уже удалено.'});
            }
            else{
                console.log("Deleted : ", docs);
            }
        });

        await checkNewAds(reqData, 'Объявление удалено.', res);
        // let ads;
        // if (reqData.user.username === 'admiN01') {
        //     ads = await Ad.find({moderated: false});
        //     if (ads.length === 0) return res.send({success: 'Нет новых объявлений.'});
        // } else {
        //     ads = await Ad.find({user_id: reqData.user._id});
        //     if (ads.length === 0) return res.send({success: 'У вас нет объявлений.'});
        // }
        // res.status(200).send({advs: ads, user: reqData.user, success: 'Объявление удалено.'});
    } catch (e) {
        console.log(e);
        res.status(400).send({error: 'Ой! Не получилось удалить.'});
    }
});

module.exports = router;
