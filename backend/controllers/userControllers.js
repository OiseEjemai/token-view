const bcrypt = require("bcryptjs")
const cloudinary = require("cloudinary").v2

const MetaApi = require('metaapi.cloud-sdk').default;

// models
const Notification = require("../models/Notification.js")
const User = require("../models/User.js")

module.exports.getUserProfile = async (req, res) => {
	const { username } = req.params;

	try {
		const user = await User.findOne({ username }).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });

		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getUserProfile: ", error.message);
		res.status(500).json({ error: error.message });
	}
};


module.exports.updateUser = async (req, res) => {
	const { name, email, username, currentPassword, newPassword } = req.body;

	const userId = req.user._id;

	try {
		let user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });
		if (currentPassword && newPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });
			if (newPassword.length < 6) {
				return res.status(400).json({ error: "Password must be at least 6 characters long" });
			}

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(newPassword, salt);
		}

		if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
			return res.status(400).json({ error: "Please provide both current password and new password" });
		}

		if (!newPassword && !currentPassword) {
			return;
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.username = username || user.username;

		user = await user.save();

		// password should be null in response
		user.password = null;

		return res.status(200).json(user);
	} catch (error) {
		console.log("Error in updateUser: ", error.message);
		res.status(500).json({ error: error.message });
	}
};

module.exports.saveSearches = async (req, res) => {
	try {
		const search = req.body.search;

		const userId = req.user._id;

		let user = await User.findById(userId)

		if (!user) return res.status(404).json({ message: "User not found" });

		user.searched.push(search)
		await User.updateOne({ _id: userId }, { $push: { searched: search } });
		await user.save();

		res.status(200).json(user.searched);

	} catch (error) {
		console.log("Error in saveSearches: ", error);
		res.status(500).json({ error: error });
	}
}

module.exports.getSearches = async (req, res) => {
	try {
		const userId = req.user._id;

		const user = await User.findById({ userId }).select("-username")

		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json(user.searched);
		console.log(user)

	} catch (error) {

	}
}

// module.exports.placeOrder = async (req, res) => {
// 	const { action, symbol, lotSize } = req.body;
//     const user = await User.findById(req.user._id);
    
//     try {
//         const api = new MetaApi(process.env.META_API_TOKEN);
//         const account = await api.metatraderAccountApi.getAccount(process.env.META_ACCOUNT_ID);

//         if (!account) return res.status(404).json({ error: 'MetaTrader account not found' });

//         await account.deploy();
//         await account.waitConnected();

//         const connection = account.getConnection();
//         const order = await connection.createMarketOrder({
//             symbol: symbol, // e.g., 'EURUSD'
//             volume: lotSize, // e.g., 0.1
//             action: action === 'buy' ? 'BUY' : 'SELL',
//         });

//         if (order) {
//             // Example: Deduct $100 for each trade (adjust accordingly)
//             const updatedBalance = user.balance - 100;
//             user.balance = updatedBalance > 0 ? updatedBalance : 0;
//             await user.save();
//             res.json({ order, balance: user.balance });
//         } else {
//             res.status(400).json({ error: 'Order not placed' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error placing order' });
//     }
// }