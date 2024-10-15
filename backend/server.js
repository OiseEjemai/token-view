const express = require("express");
const path = require("path");
const crypto = require('crypto-js');
const fetch = require('node-fetch')
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
const apiBase = 'https://api.bitfinex.com';
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

const apiKey = process.env.BFX_API_KEY;
const apiSecret = process.env.BFX_API_SECRET;

console.log(apiKey)
console.log(apiSecret)

const corsOptions = {
    // origin: 'https://token-view-project.vercel.app', //Frontend URI (http://localhost:5173)
    origin: 'http://localhost:5173', //Frontend URI (http://localhost:5173)
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

app.post('/auth/signup', async (req, res) => {
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

app.post('/api/trade', async (req, res) => {
    const endpoint = '/api/v2/auth/w/order/submit';
    const { symbol, amount, side } = req.body;
  
    const nonce = (Date.now() * 1000).toString();

    console.log(nonce)
    const body = {
      type: 'EXCHANGE MARKET',
      symbol,
      amount,
      side
    };
  
    const signaturePayload = endpoint + nonce + body;
    const hmac = crypto.createHmac('sha384', apiSecret);
    const signature = hmac.update(signaturePayload).digest('hex');
    // const signature = `/v2/auth/w/order/submit${nonce}${JSON.stringify(body)}`;
    // const sig = crypto.HmacSHA384(signature, apiSecret).toString();
    console.log(sig)
  
    try {
      const response = await fetch(`${apiBase}/${endpoint}`, {
        method: 'POST',
        headers: {
          'bfx-apikey': apiSecret,
          'bfx-signature': signature,
          'bfx-nonce': nonce,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      console.log(data)
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Order failed', details: error });
    }
  });
  

app.post('/auth/login', async (req, res) => {
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
    // connectDB();
});
