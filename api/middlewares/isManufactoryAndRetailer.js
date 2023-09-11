const isManufactoryAndRetailer = async (req, res, next) => {
    if (req.userRole === 0 || req.userRole === 1 ) {
        next();
    } else {
        return res
            .status(401)
            .json({ success: false, message: 'You are not manufactory or retailer.' });
    }
};

module.exports = isManufactoryAndRetailer;
