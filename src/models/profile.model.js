const { query } = require('../connection');

exports.getAll = async () => {
    try {
        return await query(`
            SELECT 
                profile_id AS profileId,
                name,
                description,
                status,
                created_at AS createdAt,
                updated_at AS updatedAt 
            FROM profiles
        `);
    } catch (error) {
        return error;
    }
};

exports.getById = async (id) => {
    try {
        return await query(`
            SELECT  
                profile_id AS profileId,
                name,
                description,
                status,
                created_at AS createdAt,
                updated_at AS updatedAt 
            FROM profiles 
            WHERE profile_id = ${id}
        `);
    } catch (error) {
        return error;
    }
};

exports.create = async (data) => {
    try {
        return await query(`
            INSERT INTO profiles (name, description, status)
            VALUES ${(data.name, data.description, data.status)}
        `);
    } catch (error) {
        return error;
    }
};

exports.update = async (data) => {
    try {
        return await query(`
            UPDATE profiles 
            SET 
                name = ${data.name}, 
                description = ${data.description}, 
                status = ${data.status}      
            WHERE profile_id = ${data.profileId}
        `);
    } catch (error) {
        return error;
    }
};

exports.delete = async (id) => {
    try {
        return await query(`
            DELETE FROM profiles WHERE profile_id = ${id}
        `);
    } catch (error) {
        return error;
    }
};
