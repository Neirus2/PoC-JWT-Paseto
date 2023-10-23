const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    role: String,
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);


