const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')
const {User} = require('./models')

module.exports = (passport) => {
  passport.use(
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.authentication.jwtSecret
    },
    async function (jwtPayload, done) {
      try {
        const user = await User.findOne({
          where: {
            id: jwtPayload.id
          }
        })

        if (!user) return done(new Error('Invalid credentials'), false)
        return done(null, user)
      } catch (err) {
        return done(new Error('Unknown authentication error'), false)
      }
    })
  )
}
