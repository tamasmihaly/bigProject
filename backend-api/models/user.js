const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    blogposts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogpost'
    }
}, {
    timestamps: true
})
const options = {
    maxAttemps: 100
}
userSchema.plugin(passportLocalMongoose, options); // ide lehet option-oket írnig User.plugin(passportLocalMongoose, options);


module.exports = mongoose.model('User', userSchema)