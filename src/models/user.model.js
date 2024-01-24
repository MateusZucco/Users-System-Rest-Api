const { query } = require('../connection');

exports.create = async (data) => {
    console.log(data);

    try {
        return await query(`
            INSERT INTO users (email, password, first_name, last_name, age, profile_id)
            VALUES ${(data.email, data.password, data.firstName, data.lastName, data.age, data.profileId)}
        `);
    } catch (error) {
        return error;
    }
};

exports.findByEmail = async (data) => {
    console.log(data);

    try {
        return await query(`
            SELECT 
                user_id AS userId,
                email,
                password,
                first_name AS fName,
                last_name AS lName
            FROM USERS WHERE users.email LIKE ${data.email}
        `);
    } catch (error) {
        return error;
    }
};