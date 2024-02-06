const { verifyParams } = require('../utils/verifyParams');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');

exports.create = async (req, res) => {
    let data = { ...req.body };
    try {
        verifyParams(data, ['email', 'password', 'firstName', 'lastName', 'age']);
        bcrypt.genSalt(12, (error, salt) => {
            if (error) throw error;
            bcrypt.hash(data.password, salt, async (err, hash) => {
                if (err) throw err;
                data.password = hash;

                const response = await UserModel.create(data);
                res.status(201).json({ response, message: 'User created!' });
            });
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
        res.status(500).send(err);
    }
};

exports.getAll = async (req, res) => {
    try {
        let users = await UserModel.getAll();
        users = await encryptUser(users);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err);
    }
};

async function encryptUser(users) {
    const encryptedUsers = [];
    for await (const user of users) {
        const newUser = { ...user };

        newUser.email = await new Promise((resolve, reject) => {
            bcrypt.hash(user.email, 12, async (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });

        newUser.userId = await new Promise((resolve, reject) => {
            bcrypt.hash(user.userId.toString(), 12, async (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });

        encryptedUsers.push(newUser);
    }

    return [...encryptedUsers];
}
