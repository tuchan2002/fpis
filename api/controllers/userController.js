const db = require('../models');

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await db.User.findAll({
                attributes: { exclude: ['password'] }
            });

            res.status(200).json({
                message: 'Get users successfully.',
                success: true,
                data: {
                    users
                }
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await db.User.findOne({
                where: {
                    id
                },
                attributes: { exclude: ['password'] }
            });

            res.status(200).json({
                message: 'Get user successfully.',
                success: true,
                data: {
                    user
                }
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    getUsersByRole: async (req, res) => {
        const { role } = req.params;

        try {
            const users = await db.User.findAll({
                where: {
                    role
                },
                attributes: { exclude: ['password'] }
            });

            res.status(200).json({
                message: 'Get users by role successfully.',
                success: true,
                data: {
                    users
                }
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = userController;
