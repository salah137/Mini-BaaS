const jwt = require("jsonwebtoken")


const userMiddlewere = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: "error", msg: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        // Use HS256 (default) unless you are using RSA keys
        const decoded = jwt.verify(token, process.env.JWT); // remove algorithm option unless you're sure

        next();

    } catch (e) {
        console.error("JWT verify failed:", e.message);
        return res.status(401).json({ status: "error", msg: "Invalid or expired token" });
    }
};


const validateEmail = (email,) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


module.exports = {userMiddlewere,validateEmail} 