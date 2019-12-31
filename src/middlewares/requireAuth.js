const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    // authorization === Bearer + Dfjkajdpfie~

    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.1'});
    }

    const token = authorization.replace('Bearer ', '');
    console.log(token);
    jwt.verify(token, 'KEY', async (err, payload) => {
        if (err) {
            console.error(err);
            return res.status(401).send({ error: 'You must be logged in.2'})
        }

        const { userId } = payload;

        const user = await User.findById(userId);
        req.user = user;
        next();
    })
}