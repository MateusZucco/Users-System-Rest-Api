const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const verifyToken = async (req, res, next) => {
    try {
        req.user = undefined;

        if ('headers' in req && 'authorization' in req.headers && req.headers['authorization'].split(' ')[1]) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET || '12345abcde!@#$%', async function (err, decode) {
                if (err || !decode) {
                    throw 'Token expired';
                }

                const user = await UserModel.getById(decode.userId);

                if (!user) {
                    throw 'Invalid token';
                }

                req.user = user;

                next();
            });
        } else {
            res.status(401).send({
                message: 'User without token',
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = verifyToken;
