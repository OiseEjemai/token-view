const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema(
	{
		content: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);


module.exports = mongoose.model("Notification", notificationSchema);

