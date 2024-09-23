const path = "path";
const express = require("express")
const dotenv = require("dotenv")
const { protectRoute } = require("./middleware/protectRoute")
const User = require('./models/User')
const cookieParser = require("cookie-parser")
const cors = require('cors');
const MetaApi = require('metaapi.cloud-sdk').default;
const cloudinary = require('cloudinary').v2


const authRoutes = require("./routes/auth.route")
const userRoutes = require("./routes/user.route")
const notificationRoutes = require("./routes/notification.route")

const { connectDB } = require('./db/connectDB')
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json({ limit: "5mb" })); // to parse req.body
// limit shouldn't be too high to prevent DOS
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser());
const corsOptions = {
	origin: 'http://localhost:5173', //Frontend URI (http://localhost:5173)
	credentials: true, //Allow credentials (cookies)
	optionsSuccessStatus: 200,
};

app.use(cors())
app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // For preflight requests


app.use("/backend/auth", authRoutes);
app.use("/backend/users", userRoutes);
app.use("/backend/notifications", notificationRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB();
});