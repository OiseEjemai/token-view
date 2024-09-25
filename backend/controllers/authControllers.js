const { generateTokenAndSetCookie } = require("../lib/utils/generateToken.js")
const User = require("../models/User.js")
const bcrypt = require("bcryptjs")


module.exports.signup = async (req, res) => {
    console.log(req.body)
    // try {
    //     const { userId, username, email, name } = req.body;
    //     console.log(req.body);

    //     // Check if the user already exists
    //     const existingUser = await User.findOne({ email });
    //     if (existingUser) {
    //         return res.status(400).json({ error: "User already exists with this email" });
    //     }

    //     // Create a new user
    //     const newUser = new User({
    //         userId,
    //         name,
    //         email,
    //         username,
    //     });

    //     // Save the user to the database
    //     await newUser.save();

    //     // Respond with user data
    //     res.status(201).json({
    //         _id: newUser._id,
    //         userId: newUser.userId,
    //         name: newUser.name,
    //         username: newUser.username,
    //         email: newUser.email,
    //     });
    // } catch (error) {
    //     console.error("Error in signup controller", error);
    //     res.status(500).json({ error: "Internal Server Error" });
    // }
};


module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            searched: user.searched,
            balance: user.balance,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: error.message });
    }
};

// module.exports.logout = async (req, res) => {
//     try {
//         res.cookie("jwt", "", { maxAge: 0 });
//         res.status(200).json({ message: "Logged out successfully" });
//     } catch (error) {
//         console.log("Error in logout controller", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// module.exports.getMe = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id).select("-password");
//         res.status(200).json(user);
//     } catch (error) {
//         console.log("Error in getMe controller", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
