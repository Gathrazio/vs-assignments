function alteration(req, res, next) {
    req.body = {
        name: "James"
    }
    next()
}

module.exports = alteration;