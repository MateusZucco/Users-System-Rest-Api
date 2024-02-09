const { query } = require('../connection');

exports.getAll = async () => {
    try {
        const response = await query(`
            SELECT 
                user_id AS userId,
                email,
                password,
                first_name AS fName,
                last_name AS lName,
                age,
                profile_id AS profileId,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM users
        `);
        return response;
    } catch (error) {
        return error;
    }
};

exports.getById = async (id) => {
    try {
        const response = await query(`
            SELECT  
                user_id AS userId,
                email,
                password,
                first_name AS fName,
                last_name AS lName,
                age,
                profile_id AS profileId,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM users 
            WHERE user_id = ${id}
        `);
        return response[0];
    } catch (error) {
        return error;
    }
};

exports.getByEmail = async (email) => {
    try {
        const response = await query(`
            SELECT 
                user_id AS userId,
                email,
                password,
                first_name AS fName,
                last_name AS lName,
                age,
                profile_id AS profileId,
                created_at AS createdAt,
                updated_at AS updatedAt
            FROM users 
            WHERE users.email LIKE "${email}"
        `);
        return response[0];
    } catch (error) {
        throw error;
    }
};

exports.create = async (data) => {
    try {
        const response = await query(`
                INSERT INTO users (email, password, first_name, last_name, age, profile_id)
                VALUES ("${data.email}", "${data.password}", "${data.firstName}", "${data.lastName}", ${data.age}, ${
            data.profileId || null
        })
        `);
        return response;
    } catch (error) {
        throw error;
    }
};

exports.update = async (data) => {
    try {
        return await query(`
            UPDATE users 
            SET 
                email = ${data.email}, 
                password = ${data.password}, 
                first_name = ${data.fName}, 
                last_name = ${data.lName}, 
                age = ${data.age}, 
                profile_id = ${data.profileId}
            WHERE user_id = ${data.userId}
        `);
    } catch (error) {
        return error;
    }
};

exports.delete = async (id) => {
    try {
        return await query(`
            DELETE FROM users WHERE user_id = ${id}
        `);
    } catch (error) {
        return error;
    }
};
