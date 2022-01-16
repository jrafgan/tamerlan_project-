const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require("nanoid");

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: async function(value) {
                if (!this.isModified('username')) return;
                const user = await User.findOne({username: value});
                if (user) throw new Error();
            },
            error: 'Пользователь с таким логином уже существует !'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    secretKey1: {
        type: String,
        unique: true,
        sparse: true
    }, // ключ для Access token
    secretKey2: {
        type: String,
        unique: true,
        sparse: true
    }, // ключ для Refresh token
    refreshToken: {
        type: String
    }
});

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.secretKey1;
        delete ret.secretKey2;
        delete ret.refreshToken;
        return ret;
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
