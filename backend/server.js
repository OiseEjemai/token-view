const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { protectRoute } = require("./middleware/protectRoute");
const User = require('./models/User');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyParser = require("body-parser");
const MetaApi = require('metaapi.cloud-sdk').default;
const cloudinary = require('cloudinary').v2;

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const notificationRoutes = require("./routes/notification.route");

const { connectDB } = require('./db/connectDB');
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const app = express();
const PORT = process.env.PORT || 5500;
app.use(bodyParser.json());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Ensure cookies are parsed

const corsOptions = {
	origin: 'https://token-view-project.vercel.app', //Frontend URI (http://localhost:5173)
	credentials: true, //Allow credentials (cookies)
};

app.use(cors())
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/analyzer/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "analyzer", "dist", "index.html"));
	});
}

app.post('/auth/signup', async(req, res) => {
	try {
        const { userId, username, email, name } = req.body;
        console.log(req.body);

        // Check if the user already exists
        // const existingUser = await User.findOne({ email });
        // if (existingUser) {
        //     return res.status(400).json({ error: "User already exists with this email" });
        // }

        // Create a new user
        const newUser = new User({
            userId,
            name,
            email,
            username,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with user data
        res.status(201).json({
            _id: newUser._id,
            userId: newUser.userId,
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Error in signup controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/auth/login', async(req, res) => {
	try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            searched: user.searched,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
