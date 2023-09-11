const isCustomer = async (req, res, next) => {
    if (req.userRole === 2) {
        next();
    } else {
        return res
            .status(401)
            .json({ success: false, message: 'You are not customer.' });
    }
};

module.exports = isCustomer;
