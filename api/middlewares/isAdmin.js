const isAdmin = async (req, res, next) => {
    console.log(req);
    if (req.userRole === 3) {
        next();
    } else {
        return res
            .status(401)
            .json({ success: false, message: 'You are not admin.' });
    }
};

module.exports = isAdmin;
