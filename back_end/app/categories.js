const express = require('express');
const Category = require('../models/Category');
const router = express.Router();
// const auth = require('../middleware/auth');
// const multer = require('multer');
// const path = require('path');
// const config = require('../config');
// const nanoid = require('nanoid');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, config.uploadPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, nanoid() + path.extname(file.originalname));
//     }
// });

// const upload = multer({storage});
// todo здесь надо дать право изменений категорий для админа
// здесь проверка аутентификациии не нужно, т.к. это доступно любому гостю приложения
// при загрузке приложения, список категорий отправляется на клиент. Пока список есть на клиенте, пока приложение не запущено
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        return res.status(400).send(error)
    }
});

// router.post('/', auth, upload.single('image'), async (req, res) => {
//     try {
//
//         const productData = req.body;
//
//         productData.user = req.user;
//         if (req.file) {
//             productData.image = req.file.filename;
//         }
//         const product = new ApproveAd(productData);
//         console.log('this. is product before save ', product);
//         await product.save();
//         const products = await ApproveAd.find().populate('user').sort({datetime: -1});
//         res.status(200).send(products);
//
//     } catch (error) {
//         return res.status(400).send(error)
//     }
//
// });

// router.delete('/', auth, async (req, res) => {
//     try {
//         const product = await ApproveAd.findById(req.body.product);
//         if (product.user.equals(req.user._id)) {
//             product.remove();
//             return res.status(200).send('Successfully deleted ' + product);
//         } else {
//             return res.status(400).send('Not allowed !');
//         }
//
//     } catch (error) {
//         return res.status(400).send(error)
//     }
//
// });


module.exports = router;