const { User } = require('../models/User');

module.exports = async (req, res, next) => {
    const userID = req.user.id;
    const user = await User.findById(userID);
    if (!user) return res.status(400).json({ success: false, error: 'User not found', errorType: 'all', stackTrace: 'admin middleware' });// karbar vojood nadare

    if (user.role !== 1) return res.status(403).json({ success: false, error: 'Unauthorized! you don\'t have permission to do so', errorType: 'all', stackTrace: 'admin middleware' }) //role karbar admin nist 

    next(); //admin hast va ezaje dastresi dare
}

// 0 = normal user
// 1 = admin