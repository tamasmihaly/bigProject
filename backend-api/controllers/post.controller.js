const Blogpost = require('../models/blogpost');

module.exports = {
    getPost: (req, res) => {
        Blogpost.find({}, (err, post) => {
            if (err) {
                res.send(err)
            }
            res.json(post)
        })
    },
    newPost: (req, res) => {
        Blogpost.create(req.body, (err, post) => {
            if (err) {
                res.send(err)
            }
            res.json(post)
        })
    }
}