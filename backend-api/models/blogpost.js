const mongoose = require('mongoose');

const blogpostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    blogpost: {
        type: String,
        required: true,
    },
    creatorId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Blogpost', blogpostSchema)