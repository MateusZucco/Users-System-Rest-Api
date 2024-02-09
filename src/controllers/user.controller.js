const { verifyParams } = require('../utils/verifyParams');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');
const { encryptUser } = require('../utils/cryptUsers');

exports.create = async (req, res) => {
    let data = { ...req.body };
    try {
        verifyParams(data, ['email', 'password', 'firstName', 'lastName', 'age']);
        bcrypt
            .genSalt(12)
            .then((salt) => {
                bcrypt
                    .hash(data.password, salt)
                    .then(async (hash) => {
                        data.password = hash;

                        const response = await UserModel.create(data);
                        res.status(201).json({ response, message: 'User created!' });
                    })
                    .catch((err) => {
                        throw err;
                    });
            })
            .catch((err) => {
                throw err;
            });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.login = async (req, res) => {
    const data = { ...req.body };

    try {
        verifyParams(data, ['email', 'password']);

        const user = await UserModel.getByEmail(data.email);

        if (!user) res.status(404).send({ message: 'User not found' });

        await bcrypt
            .compare(data.password, user.password)
            .then((response) => {
                if (!response) res.status(422).send({ message: 'Wrong password' });
            })
            .catch((err) => {
                throw err;
            });

        const secret = process.env.JWT_SECRET || '12345abcde!@#$%';

        jwt.sign(
            { userId: user.userId },
            secret,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1m',
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token, message: 'User loged!' });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.getAll = async (req, res) => {
    try {
        const users = await UserModel.getAll();

        let encryptedUsers = [];
        users.forEach((user) => {
            encryptedUsers.push(encryptUser(user));
        });

        res.status(200).json(encryptedUsers);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getById = async (req, res) => {
    try {
        const { userId } = req.params;

        let users = await UserModel.getById(userId);
        users = encryptUser(users);
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.getByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        let users = await UserModel.getByEmail(email);
        users = encryptUser(users);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
};
