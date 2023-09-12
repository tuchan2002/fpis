const isRetailer = async (req, res, next) => {
    if (req.userRole === 1) {
        next();
    } else {
        return res
            .status(401)
            .json({ success: false, message: 'You are not retailer.' });
    }
};

module.exports = isRetailer;