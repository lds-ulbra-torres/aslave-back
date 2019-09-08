import config from '../config/config'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { user as UserModel } from '../models'

module.exports = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
    jwtSession: config.jwtSession,
  }

  const strategy = new Strategy(opts, (jwt_payload, done) => {
    UserModel.findOne({
      where: { id_user: jwt_payload.id },
      attributes: ['id_user'],
    })
      .then(user =>
        user ? done(null, { id: user.id_user }) : done(null, false)
      )
      .catch(error => done(error, null))
  })

  passport.use(strategy)
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', opts.jwtSession),
  }
}
