import * as passport from 'koa-passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook'
import { OAuth2Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth'
import { User } from 'entities/user'
import { strategies } from 'configs/passport'
import { PASSPORT_FACEBOOK_PROVIDER_ID, PASSPORT_GOOGLE_PROVIDER_ID } from 'configs/constants'

type PassportSerializerNext = (err: Error, id: any) => void
type Done = (error: any, user?: any, info?: any) => void

const env = process.env
const FACEBOOK_HAS_API: boolean = Boolean(env.FACEBOOK_CLIENT_ID && env.FACEBOOK_CLIENT_SECRET)
const GOOGLE_HAS_API: boolean = Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET)

passport.serializeUser((user: any, done: PassportSerializerNext): void => {
  done(null, user._id)
})

passport.deserializeUser((id: string, done: PassportSerializerNext): void => {
  User.findById(id, done)
})

passport.use(
  new JwtStrategy(
    strategies.jwtAuth,
    async (payload, done: Done): Promise<void> => {
      try {
        const user = await User.findById(payload.id)

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }),
)

if (FACEBOOK_HAS_API) {
  passport.use(
    new FacebookStrategy(
      strategies.facebookAuth,
      async (accessToken: string, refreshToken: string, profile: FacebookProfile, done: Done): Promise<void> => {
        try {
          let user = await User.findOne({provider_id: PASSPORT_FACEBOOK_PROVIDER_ID, profile_id: profile.id})

          console.log('User is ' + user)

          if (!user) {
            user = await User.create({
              provider_id: PASSPORT_FACEBOOK_PROVIDER_ID,
              profile_id: profile.id,
              username: profile.displayName,
            })
          }

          return done(null, user)
        } catch (err) {
          return done(err)
        }
      },
    ),
  )
}

if (GOOGLE_HAS_API) {
  passport.use(
    new GoogleStrategy(
      strategies.googleAuth,
      async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: Done): Promise<void> => {
        try {
          let user = await User.findOne({provider_id: PASSPORT_GOOGLE_PROVIDER_ID, profile_id: profile.id})

          console.log('User is ' + user)

          if (!user) {
            user = await User.create({
              provider_id: PASSPORT_GOOGLE_PROVIDER_ID,
              profile_id: profile.id,
              username: profile.displayName,
            })
          }

          return done(null, user)
        } catch (err) {
          return done(err)
        }
      },
    ),
  )
}
