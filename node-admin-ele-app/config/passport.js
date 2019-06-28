// 进行token验证
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('./keys').secretOrPrivateKey
const mongoose = require('mongoose')
const User = mongoose.model('users')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        // valid successed
        User.findOne({email: jwt_payload.email})
            .then(user => {
                if (!!user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
    }));
}