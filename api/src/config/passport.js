const passport    = require('passport')
const passportJwt = require('passport-jwt')
// const jwtSecret   = require('C:/SISTEMAS/gestao_acesso/jwtSecret/JwtSecret') 
const jwtSecret = require('./JwtSecret.js') // TODO: TEST

const { Strategy, ExtractJwt } = passportJwt

module.exports = async _ => {
    
    return jwtSecret.getKey().then(secret => {
        
        const params = {
            secretOrKey: secret,
            ignoreExpiration: true,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        };
        
        const strategy = new Strategy(params, (payload, done) => {
            done(null, { ...payload })
        });
        
        passport.use(strategy)
        
        return {
            authenticate: () => passport.authenticate('jwt', { session: false })
        }
    });
}