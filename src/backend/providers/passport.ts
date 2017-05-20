import * as passport from 'koa-passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { Profile, Strategy as FacebookStrategy } from 'passport-facebook'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { User } from 'entities/user'
import { strategies } from 'configs/passport'

type PassportSerializerNext = (err: Error, id: any) => void
type Done = (error: any, user?: any, info?: any) => void

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
passport.use(
  new FacebookStrategy(
    strategies.facebookAuth,
    async (accessToken: string, refreshToken: string, profile: Profile, done: Done): Promise<void> => {
      try {
        let user = await User.findOne({ provider_id: 0, profile_id: profile.id })
        console.log('User is ' + user)
        if (!user) {
          user = await User.create({
            provider_id: 0,
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

passport.use(
  new GoogleStrategy(
    strategies.googleAuth,
    async (accessToken: string, refreshToken: string, profile: Profile, done: Done): Promise<void> => {
      try {
        let user = await User.findOne({ provider_id: 1, profile_id: profile.id })
        console.log('User is ' + user)
        if (!user) {
          user = await User.create({
            provider_id: 1,
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
