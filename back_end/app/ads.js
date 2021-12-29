const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ad = require('../models/Ad');

router.post('/', auth, async (req, res) => {
    try {
        res.header('Authorization', 'Bearer ' + req.data.accessToken);
        const adsData = new Ad({...req.body, user_id: req.data.user._id});
        await adsData.save();
        res.status(200).send({adsData, user: req.data.user, success: 'Объявление создано.'});
    } catch(e) {
        console.log(e);
        return res.status(400).send({error: ' Ой! Не получилось создать объявление.'});
    }
});

router.patch('/', auth, async (req, res) => {
    try {
        const newData = req.body;
        const user = req.data.user;
        res.header('Authorization', 'Bearer ' + user.accessToken);

        const update = {...newData, _id: newData.id};
        const opts = { new: true };
        await Ad.findByIdAndUpdate(newData.id, update, opts);
        const ads = await Ad.find({user_id: user._id});

        res.status(200).send({ads, user, success: 'Объявление изменено.'});
    } catch(e) {
        console.log(e);
        return res.status(400).send({error: 'Ой! Не получилось изменить.'});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const id = req.data.user._id;
        const username = req.data.user.username;
        let ads = [];
        if (username === 'admiN01') {
            ads = await Ad.find({moderated: false});
        } else {
            ads = await Ad.find({user_id: id});
        }
        if (ads.length === 0) return res.send({success: 'У вас нет объявлений.'});

        res.send(ads);
    } catch(e) {
        console.log(e);
        return res.status(400).send({error: 'Ой! Что-то не так.'});
    }
});

module.exports = router;
