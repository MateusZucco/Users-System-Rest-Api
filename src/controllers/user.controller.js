const { verifyParams } = require('../utils/verifyParams');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');

exports.create = async (req, res) => {
    let data = { ...req.body };

    bcrypt.genSalt(12, (error, salt) => {
        if (error) throw error;
        bcrypt.hash(data.password, salt, (err, hash) => {
            if (err) throw err;
            data.password = hash;
        });
    });

    try {
        verifyParams(data, ['email', 'password', 'firstName', 'lastName', 'age']);

        const response = await UserModel.create(data);
        res.status(201).json({ response, msg: 'User created!' });
    } catch (err) {
        res.status(500).err({ msg: err });
    }
};

exports.login = async (req, res) => {
    const data = { ...req.body };

    try {
        verifyParams(data, ['email', 'password']);

        const user = await UserModel.findByEmail(data);

        if (!user) res.status(404).err({ msg: 'User not found' });

        bcrypt.compare(data.password, user.password, (err, result) => {
            if (err) throw err;
            if (!result) res.status(422).err({ msg: 'Wrong password' });
        });

        const secret = process.env.JWT_SECRET || '12345abcde!@#$%';

        jwt.sign({ userId: user.userId }, secret, { algorithm: 'RS256' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, msg: 'User loged!' });
        });
    } catch (err) {
        res.status(500).err({ msg: err });
    }
};
