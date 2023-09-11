const isManufactory = async (req, res, next) => {
    if (req.userRole === 0) {
        next();
    } else {
        return res
            .status(401)
            .json({ success: false, message: 'You are not manufactory.' });
    }
};

module.exports = isManufactory;
