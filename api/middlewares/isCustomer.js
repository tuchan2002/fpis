const isCustomer = async (req, res, next) => {
    if (req.role === 2) {
        next();
    } else {
        return res
            .status(401)
            .json({ success: false, message: 'You are not customer.' });
    }
};

module.exports = isCustomer;
