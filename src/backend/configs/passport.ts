import { StrategyOption as FacebookStrategyOption } from 'passport-facebook'
import { IOAuth2StrategyOption } from 'passport-google-oauth'
import { ExtractJwt, StrategyOptions as JwtStrategyOptions } from 'passport-jwt'
import { JWT_SECRET } from 'configs/constants'

export const strategies = {
  facebookAuth: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  } as FacebookStrategyOption,

  googleAuth: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  } as IOAuth2StrategyOption,

  jwtAuth: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  } as JwtStrategyOptions,
}

export const facebookScope = [ 'email' ]

export const googleScope = [ 'profile' ]
