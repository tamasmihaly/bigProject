const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    /* id: {
       type: mongoose.Schema.Types.ObjectId,
       default: new mongoose.Types.ObjectId()
     },*/
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Methods
PostSchema.method({})

// Static Methods
PostSchema.static({})

module.exports = mongoose.model('Post', PostSchema)