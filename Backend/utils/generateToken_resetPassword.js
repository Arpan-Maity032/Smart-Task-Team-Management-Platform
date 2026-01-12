const jwt = require("jsonwebtoken");

const generateResetToken = (id) => {
    return jwt.sign(
        {id, purpose:"reset_password"},
        process.env.JWT_RESET_SECRET,
        {expiresIn: "15m"},
    );
};

module.exports = generateResetToken;