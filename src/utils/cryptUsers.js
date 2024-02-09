const crypto = require('crypto');

const key = process.env.CIPHER_KEY || crypto.randomBytes(32);
const encryptionIV = process.env.IV_KEY || crypto.randomBytes(16);

exports.encryptUser = (user) => {
    function encryptData(data) {
        const cipher = crypto.createCipheriv('aes-256-cbc', key, encryptionIV);
        return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64'); // Encrypts data and converts to hex and base64
    }

    const newUser = { ...user };
    newUser.email = encryptData(user.email);
    newUser.userId = encryptData(user.userId.toString());

    return newUser;
};

// // Decrypt data
//  function decryptData(encryptedData) {
//     const buff = Buffer.from(encryptedData, 'base64');
//     const decipher = crypto.createDecipheriv('aes-256-cbc', key, encryptionIV);
//     return decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8'); // Decrypts data and converts to utf8
// }
