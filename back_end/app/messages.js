const express = require('express');
const router = express.Router();
const aut = require('../middleware/aut');
const Message = require('../models/Message');
const User = require('../models/User');

const getMsgs = async (reqData, res) => {
    let messages;
    if (reqData.user.username === 'admiN01') {
        messages = await Message.find({toUsername: 'admiN01'});
        if (messages.length === 0) return res.status(202).send({user: reqData.user});
    } else {
        messages = await Message.find({toUserId: reqData.user._id});
        if (messages.length === 0) return res.status(202).send({user: reqData.user});
    }
    res.status(202).send({user: reqData.user, messages});
}

router.get('/', aut, async (req, res) => {
    try {
        let reqData = req.data;
        await getMsgs(reqData, res);
    } catch (e) {
        console.log(e);
        res.status(400).send({error: 'Ой! Что-то не так.'});
    }
});

router.post('/', aut, async (req, res) => {
    try {
        let msgData = req.body;
        let reqData = req.data;
        res.header('Authorization', 'Bearer ' + reqData.accessToken);
        let recipient;
        if (msgData.toUser) {
            if (msgData.toUser === 'admiN01') {
                recipient = await User.findOne({username: 'admiN01'});
                msgData.toUserId = recipient._id;
                msgData.toUsername = 'admiN01';
            } else {
                recipient = await User.findOne({_id: msgData.toUser});
                msgData.toUserId = msgData.toUser;
                msgData.toUsername = recipient.username;
            }
        }
        const newMsg = new Message(msgData);
        await newMsg.save();
        const inboxMsgs = await Message.find({toUserId: msgData.fromUserId});

        return res.status(202).send({user: reqData.user, messages: inboxMsgs, success: 'Сообщение отправлено !'});
    } catch (e) {
        console.log('message save err : ', e);
        return res.status(400).send({error: e});
    }
});

router.patch('/:id', aut, async (req, res) => {
    try {
        let reqData = req.data;
        const id = req.params.id;
        const update = {newMsg: false};
        const opts = {new: true};
        await Message.findByIdAndUpdate(id, update, opts);
        await getMsgs(reqData, res);
    } catch (e) {
        console.log(e);
        res.status(400).send({error: 'Ой! Что-то не так.'});
    }
});


module.exports = router;
