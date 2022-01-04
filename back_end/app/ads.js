const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ad = require('../models/Ad');

router.post('/', auth, async (req, res) => {
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

router.patch('/', auth, async (req, res) => {
    try {
        const newData = req.body;
        const user = req.data.user;
        res.header('Authorization', 'Bearer ' + user.accessToken);

        const update = {...newData};
        const opts = {new: true};
        await Ad.findByIdAndUpdate(newData.id, update, opts);

        let ads;
        if (user.username === 'admiN01') {
            ads = await Ad.find({moderated: false});
            if (ads.length === 0) return res.send({success: 'Нет новых объявлений.'});
            console.log('admin req ads');
        } else {
            ads = await Ad.find({user_id: user._id});
            if (ads.length === 0) return res.send({success: 'У вас нет объявлений.'});
        }

        res.status(200).send({advs: ads, user: user, success: 'Объявление изменено.'});
    } catch (e) {
        console.log(e);
        res.status(400).send({error: 'Ой! Не получилось изменить.'});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const id = req.data.user._id;
        const username = req.data.user.username;
        console.log('ads for ', username);
        let ads;
        if (username === 'admiN01') {
            ads = await Ad.find({moderated: false});
        } else {
            ads = await Ad.find({user_id: id});
        }
        if (ads.length === 0) return res.send({success: 'У вас нет объявлений.'});

        res.send(ads);
    } catch (e) {
        console.log(e);
        res.status(400).send({error: 'Ой! Что-то не так.'});
    }
});

router.delete('/', auth, async (req, res) => {
    try {
        const id = req.body.id;
        const user = req.data.user;
        res.header('Authorization', 'Bearer ' + user.accessToken);

        await Ad.findByIdAndDelete(id, function (err, docs) {
            if (err){
                console.log(err);
                return res.status(400).send({error: 'Ой! Уже удалено.'});
            }
            else{
                console.log("Deleted : ", docs);
            }
        });

        let ads;
        if (user.username === 'admiN01') {
            ads = await Ad.find({moderated: false});
            if (ads.length === 0) return res.send({success: 'Нет новых объявлений.'});
        } else {
            ads = await Ad.find({user_id: user._id});
            if (ads.length === 0) return res.send({success: 'У вас нет объявлений.'});
        }

        res.status(200).send({advs: ads, user: user, success: 'Объявление удалено.'});
    } catch (e) {
        console.log(e);
        res.status(400).send({error: 'Ой! Не получилось удалить.'});
    }
});

module.exports = router;
