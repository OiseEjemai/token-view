const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String,
        required: true,
        unique: true 
    },
    password: { 
        type: String, 
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    searched: [
        {
            type: String,
            default: [],
        }
    ],
    balance: {  // Paper money balance field
        type: Number,
        default: 1000,  // Default balance is $1,000
        required: true,
    },
},
{timestamps: true}
);


UserSchema.methods.updateBalance = function(amount) {
    this.balance += amount; // amount can be positive (profit) or negative (loss)
    return this.save(); // Save the updated balance
};

module.exports = mongoose.model('User', UserSchema);