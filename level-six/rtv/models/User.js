const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

// pre-save hook to encrypt user passwords on signup
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next()
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) return next(err)
        user.password = hash;
        next()
    })
})

module.exports = mongoose.model("User", userSchema);