const jwt = require("jsonwebtoken");

const generateResetToken = (id,currentPassword) => {
    const secret = process.env.JWT_RESET_SECRET + currentPassword;
    return jwt.sign(
        {id, purpose:"reset_password"},
        secret,
        {expiresIn: "15m"},
    );
};

module.exports = generateResetToken;