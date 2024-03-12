const { query, transaction } = require('../connection');

exports.getAll = async () => {
    try {
        const profiles = await query(`
            SELECT 
                profile_id AS profileId,
                name,
                description,
                status,
                created_at AS createdAt,
                updated_at AS updatedAt 
            FROM profiles
        `);

        for (const [index, el] of profiles.entries()) {
            profiles[index].permissions = await query(`
                SELECT  
                    permission_id AS permissionId,
                    description,
                    permissions.created_at AS createdAt
                FROM profile_permission
                INNER JOIN permissions USING (permission_id) 
                WHERE profile_id = ${el.profileId}
            `);
        }
        return profiles;
    } catch (error) {
        return error;
    }
};

exports.getById = async (id) => {
    try {
        const profile = await query(`
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

        if (profile.length)
            profile[0].permissions = await query(`
                SELECT  
                    permission_id AS permissionId,
                    description,
                    permissions.created_at AS createdAt
                FROM profile_permission
                INNER JOIN permissions USING (permission_id) 
                WHERE profile_id = ${id}
            `);
        return profile[0];
    } catch (error) {
        return error;
    }
};

exports.create = async (data) => {
    return new Promise(async (resolve, reject) => {
        sql = [];
        sql.push(`
            INSERT INTO profiles (name, description, status)
            VALUES ("${data.name}", "${data.description}", "${data.status}")
        `);

        sql.push(`SET @lastProfileId = LAST_INSERT_ID()`);

        data.permissions.forEach((el) => {
            sql.push(`
                INSERT INTO profile_permission (profile_id, permission_id)
                VALUES (@lastProfileId, ${el})
            `);
        });

        try {
            const response = await transaction(sql);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
};

exports.update = async (data, profileId) => {
    return new Promise(async (resolve, reject) => {
        sql = [];
        sql.push(`
            UPDATE profiles 
            SET 
                name = "${data.name}", 
                description = "${data.description}", 
                status = "${data.status}"      
            WHERE profile_id = ${profileId}
        `);

        sql.push(`
            DELETE FROM profile_permission WHERE profile_id = ${profileId}
        `);

        data.permissions.forEach((el) => {
            sql.push(`
                INSERT INTO profile_permission (profile_id, permission_id)
                    VALUES (${profileId}, ${el})
            `);
        });
        try {
            const response = await transaction(sql);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
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
