const ProfileModel = require('../models/profile.model');
const { verifyParams } = require('../utils/verifyParams');

// const { encryptUser } = require('../utils/cryptUsers');

exports.create = async (req, res) => {
    const data = { ...req.body };
    try {
        verifyParams(data, ['name', 'description', 'permissions']);

        const response = await ProfileModel.create(data);
        res.status(201).json({ response, message: 'Profile created!' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.getAll = async (req, res) => {
    try {
        const profiles = await ProfileModel.getAll();
        res.status(200).json(profiles);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getById = async (req, res) => {
    try {
        const { profileId } = req.params;

        if (!profileId) {
            res.status(200).json({ message: "Profile id can't be null" });
        }

        const profiles = await ProfileModel.getById(profileId);
        // users = encryptUser(users);
        res.status(200).json(profiles);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.update = async (req, res) => {
    const { profileId } = req.params;
    const data = { ...req.body };

    try {
        if (!profileId) {
            res.status(200).json({ message: "Profile id can't be null" });
        }

        verifyParams(data, ['name', 'description', 'permissions']);

        const response = await ProfileModel.update(data, profileId);
        res.status(200).json({ response, message: 'Profile updated!' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.delete = async (req, res) => {
    const { profileId } = req.params;

    try {
        if (!profileId) {
            res.status(200).json({ message: "Profile id can't be null" });
        }
        const response = await ProfileModel.delete(profileId);
        res.status(200).json({ response, message: 'Profile deleted!' });
    } catch (err) {
        res.status(500).send(err);
    }
};
