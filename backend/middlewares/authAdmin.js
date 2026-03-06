import jwt from "jsonwebtoken"

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.status(401).json({ success: false, message: 'Not authorized. Please log in again.' })
        }

        const decoded = jwt.verify(atoken, process.env.JWT_SECRET)

        // Handle legacy tokens (which were just 'email+password' strings) vs new object tokens
        const tokenEmail = typeof decoded === 'string' ? decoded : decoded.email;

        // Verify the token content matches the admin email (or the legacy string matches)
        if (tokenEmail !== process.env.ADMIN_EMAIL && tokenEmail !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: 'Not authorized. Please log in again.' })
        }

        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' })
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' })
        }
        res.status(401).json({ success: false, message: error.message })
    }
}

export default authAdmin