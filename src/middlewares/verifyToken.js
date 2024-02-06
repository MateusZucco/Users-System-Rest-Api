const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const verifyToken = async (req, res, next) => {
    if ('headers' in req && 'authorization' in req.headers && req.headers['authorization'].split(' ')[1]) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET || '12345abcde!@#$%', async function (err, decode) {
            try {
                if (err || !decode) {
                    throw 'Error';
                }

                const user = await UserModel.getById(decode.userId);

                if (!user) {
                    throw 'Invalid token';
                }

                req.user = user;

                next();
            } catch (err) {
                req.user = undefined;
                res.status(401).send({
                    message: err,
                });
            }
        });
    } else {
        req.user = undefined;
        res.status(401).send({
            message: 'User without token',
        });
    }
};

module.exports = verifyToken;
