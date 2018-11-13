import config from '../config/config';
import db from '../config/db';
import passport from "passport"
import {Strategy, ExtractJwt} from "passport-jwt"

module.exports = () => {
    
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = config.jwtSecret
    opts.jwtSession = config.jwtSession

    const Users = db().models.user
    
    const strategy = new Strategy(opts,
    (jwt_payload, done) => {
        Users.findOne({
            where : {id_user: jwt_payload.id}, 
            attributes: ['id_user'],            
        })
        .then( user => {
            if (user)
                return done(null, user = { id : user.id_user })
            else
                return done(null, false)
        })
        .catch(error => {
            done(error, null)
        })
    })
    
    passport.use(strategy)
    
    return {
        initialize: () => {
            return passport.initialize()
        },
        authenticate: () => {
            return passport.authenticate("jwt", opts.jwtSession)
        }
    }
}