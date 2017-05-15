import { IStrategyOption } from 'passport-facebook'
import { IOAuth2StrategyOption } from 'passport-google-oauth'

export const strategies = {
  facebookAuth: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  } as IStrategyOption,

  googleAuth: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  } as IOAuth2StrategyOption,
}

export const facebookScope = [ 'email' ]

export const googleScope = [ 'profile' ]
