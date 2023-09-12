const isAdmin = async (req, res, next) => {
    if (req.userRole === 3) {
        next();
    } else {
        return res
            .status(401)
            .json({ success: false, message: 'You are not admin.' });
    }
};

module.exports = isAdmin;