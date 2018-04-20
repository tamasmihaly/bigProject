const mongoose = require('mongoose');

const blogpostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    blogpost: {
        type: String,
        content: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Blogpost', blogpostSchema)