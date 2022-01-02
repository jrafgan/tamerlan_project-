const {nanoid} = require("nanoid");

const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Category = require('./models/Category');

const run = async () => {
    await mongoose.connect(config.dbUrl, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }


    await User.create(
        {
            username: 'John',
            password: '123',
            email: 'john_bone@gmail.com',
            secretKey1: nanoid(),
            secretKey2: nanoid()
        },
        {
            username: 'Alan',
            password: '123',
            email: 'alan001@gmail.com',
            secretKey1: nanoid(),
            secretKey2: nanoid()
        },
        {
            username: 'Don',
            password: '123',
            email: 'carleone@gmail.com',
            secretKey1: nanoid(),
            secretKey2: nanoid()
        },
        {
            username: 'admiN01',
            password: '123',
            email: 'admin01@gmail.com',
            secretKey1: nanoid(),
            secretKey2: nanoid()
        }
    );

    // у категорий разный Board потому-что у юлы и авито разное название категорий
    await Category.create(
        {
            board: 'avito',
            catId: 'id0',
            title: 'Транспорт',
            value: 'transport'
        },
        {
            board: 'avito',
            catId: 'id1',
            title: 'Автомобили',
            value: 'avtomobili'
        },
        {
            board: 'avito',
            catId: 'id2',
            title: 'Недвижимость',
            value: 'nedvizhimost'
        },
        {
            board: 'avito',
            catId: 'id3',
            title: 'Работа',
            value: 'rabota'
        },
        {
            board: 'avito',
            catId: 'id4',
            title: 'Предложения услуг',
            value: 'predlozheniya_uslug'
        },
        {
            board: 'avito',
            catId: 'id5',
            title: 'Животные',
            value: 'zhivotnye'
        },
        {
            board: 'avito',
            catId: 'id6',
            title: 'Готовый бизнес и оборудование',
            value: 'dlya_biznesa'
        },
        {
            board: 'avito',
            catId: 'id7',
            title: 'Запчасти и аксессуары',
            value: 'zapchasti_i_aksessuary'
        },
        {
            board: 'avito',
            catId: 'id8',
            title: 'Прочее',
            value: ''
        },
        {
            board: 'youla',
            catId: 'id0',
            title: 'Спецтехника и мотоциклы',
            value: 'spetstehnika-moto'
        },
        {
            board: 'youla',
            catId: 'id1',
            title: 'Легковые автомобили',
            value: 'auto/s-probegom'
        },
        {
            board: 'youla',
            catId: 'id2',
            title: 'Недвижимость',
            value: 'nedvijimost'
        },
        {
            board: 'youla',
            catId: 'id3',
            title: 'Вакансии',
            value: 'rabota'
        },
        {
            board: 'youla',
            catId: 'id4',
            title: 'Услуги исполнителей',
            value: 'uslugi'
        },
        {
            board: 'youla',
            catId: 'id5',
            title: 'Животные',
            value: 'zhivotnye'
        },
        {
            board: 'youla',
            catId: 'id6',
            title: 'Для бизнеса',
            value: 'dlya-biznesa'
        },
        {
            board: 'youla',
            catId: 'id7',
            title: 'Запчасти и автотовары',
            value: 'avto-moto'
        },
        {
            board: 'youla',
            catId: 'id8',
            title: 'Прочее',
            value: ''
        }
    );
    return connection.close();
};

run().catch(error => {
    console.error('Something went wrong!', error);
});