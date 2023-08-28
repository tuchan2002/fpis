const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const {
    createManufactory,
    createRetailer,
    createCustomer
} = require('../web3/auth');

const createAccessToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
});

const authController = {
    register: async (req, res) => {
        const {
            name, email, password, location, phone_number, role
        } = req.body;

        try {
            const user = await db.User.findOne({
                where: {
                    email
                }
            });
            if (user) {
                return res
                    .status(400)
                    .json({ message: 'Email address already exists.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                name,
                email,
                location,
                phone_number,
                password: hashedPassword,
                role
            };

            const createdUser = await db.User.create(newUser);
            createdUser.password = '';

            let isSavedToBlockchain;
            if (role === 0) {
                isSavedToBlockchain = await createManufactory(email, name, location);
            } else if (role === 1) {
                isSavedToBlockchain = await createRetailer(email, name, location);
            } else if (role === 2) {
                isSavedToBlockchain = await createCustomer(
                    email,
                    name,
                    location,
                    phone_number
                );
            }

            if (isSavedToBlockchain) {
                console.log('Register account successful.');

                return res.status(201).json({
                    message: 'Register account successful.',
                    success: true,
                    data: {
                        user: createdUser
                    }
                });
            }
            console.log('Register account failed.');
            return res.status(500).json({ message: 'Save to blockchain failed.' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await db.User.findOne({
                where: {
                    email
                }
            });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect email or password.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect email or password.' });
            }

            user.password = '';
            const access_token = createAccessToken({
                userId: user.id,
                role: user.role
            });
            return res.json({
                message: 'Login successfully.',
                success: true,
                data: {
                    access_token,
                    user
                }
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    getAuth: async (req, res) => {
        console.log(req.userId);
        try {
            const user = await db.User.findOne({
                attributes: { exclude: ['password'] },
                where: {
                    id: req.userId
                }
            });

            if (!user) {
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found' });
            }
            return res.status(200).json({
                success: true,
                data: {
                    user
                }
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports = authController;
