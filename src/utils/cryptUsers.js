// const crypto = require('crypto');

// const key =
//     process.env.CIPHER_KEY ||
//     Buffer.alloc(32, '48 34 40 79 05 19 5a 9f f8 3e a9 d0 e7 16 d8 41 5a 73 69 20 26 07 f3 56 94 cb 1d 47 e7 c7 4d d4');
// //crypto.randomBytes(32);
// const encryptionIV = process.env.IV_KEY || Buffer.alloc(16, '1e b0 04 d5 01 e6 f3 2c bf 3f c7 19 1c 28 49 11');
// // crypto.randomBytes(16);

// exports.encryptUser = (user) => {
//     function encryptData(data) {
//         const cipher = crypto.createCipheriv('aes-256-cbc', key, encryptionIV);
//         return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64'); // Encrypts data and converts to hex and base64
//     }

//     const newUser = { ...user };
//     newUser.email = encryptData(user.email);
//     newUser.userId = encryptData(user.userId.toString());
//     newUser.password = encryptData(user.password);
//     if (user.profileId) newUser.profileId = encryptData(user.profileId.toString());

//     return newUser;
// };

// function decryptData(data) {
//     const buff = Buffer.from(data, 'base64');
//     const decipher = crypto.createDecipheriv('aes-256-cbc', key, encryptionIV);
//     return decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8'); // Decrypts data and converts to utf8
// }

// exports.decryptUserParam = (encryptedParam) => {
//     return decryptData(encryptedParam).replace(/(\r\n|\n|\r)/gm, '');
// };

// exports.decryptUser = (encryptedUser) => {
//     const newUser = { ...encryptedUser };
//     newUser.email = decryptData(encryptedUser.email).replace(/(\r\n|\n|\r)/gm, '');
//     if (encryptedUser.profileId) newUser.profileId = decryptData(encryptedUser.profileId.toString()).replace(/(\r\n|\n|\r)/gm, '');

//     return newUser;
// };
