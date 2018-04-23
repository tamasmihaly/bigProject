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
    },
    deletePost: (req, res) => {
        Blogpost.findByIdAndRemove(req.params.id, (err, post) => {
            if (err) {
                res.send(err)
            }
            res.json(post)
        })
    },
    updatePost: (req, res) => {
        req.body.updatedAt = new Date();
        Blogpost.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
            if (err) {
                res.send(err);
            }
            res.json(post);
        })
    }
}