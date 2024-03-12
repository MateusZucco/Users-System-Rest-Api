const jwt = require('jsonwebtoken');
const ProfileModel = require('../models/profile.model');

const verifyPermission = (permissions) => {
    return async (req, res, next) => {
        if (permissions.length > 0) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET || '12345abcde!@#$%', async function (err, decode) {
                if (err) {
                    throw err;
                }
                const profile = await ProfileModel.getById(decode.profileId);
                const hasPermission = permissions.some((el) => profile.permissions.find((p) => p.description === el));
                if (!hasPermission) {
                    res.status(403).json({ message: "User profile don't have this permission!" });
                    return;
                }
                next()
            });
        } else {
            next();
        }
    };
};

module.exports = verifyPermission;
