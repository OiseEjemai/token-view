const jwt = require("jsonwebtoken")

module.exports.generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});


	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		httpOnly: true, // Prevent XSS
		sameSite: "Lax", // Prevent CSRF attacks, adjust as needed
		secure: process.env.NODE_ENV === 'production', // Set to true for production HTTPS
	});
	const headers = res.getHeaders();


    console.log('Set-Cookie:', headers['set-cookie']); // This will log the Set-Cookie header
};
