import passport from 'passport';
import Google from 'passport-google-oauth20';
import Github from 'passport-github2';
import { prisma } from '../utils/prisma.service';
import { GithubProfile } from '../utils/Types';
import JWT from 'passport-jwt';
const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;
/* const GoogleStrategy = Google.Strategy;
 */ const GithubStrategy = Github.Strategy;

export default passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
    },
    async (
      accessToken: String,
      refreshToken: String,
      profile: GithubProfile,
      done: Function
    ) => {
      // find user

      const user = await prisma.user.findFirst({
        where: {
          githubId: profile.id,
        },
      });
      if (!user) {
        const user = await prisma.user.create({
          data: {
            gender: 'm',
            githubId: profile.id,
            preferences: { unit: 'kg', standard: 'percentile' },
            weight: { value: 83, unit: 'kg' },
            email: profile._json.email!,
            username: profile.username,
            age: 20,
          },
        });
      }
      done(null, user);
    }
  )
);

export const jwt_strategy = passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SESSION_KEY,
    },
    async function (jwt_payload, done) {
      const user = await prisma.user.findFirst({
        where: {
          id: jwt_payload.sub,
        },
      });
      if (user) return done(null, user);
      else if (!user) {
        // redirect to register
      }
    }
  )
);

require('dotenv').config();
const params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SESSION_KEY,
};

export const local_strategy = function () {
  const strategy = new JWT.Strategy(params, async function (payload, done) {
    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });
    if (user) return done(null, user);
    else if (!user) {
      return console.log('not found');
    }
  });
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate('jwt', { session: false });
    },
  };
};

import { IStrategyOptionsWithRequest, Strategy } from 'passport-local';
import { hash, compare } from '../utils/authUtils';
const options: IStrategyOptionsWithRequest = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

// Passport middleware to signup users
passport.use(
  'signup',
  new Strategy(options, async (req, email, password, cb) => {
    try {
      // Check if user found
      const existsEmail = await prisma.user.findFirst({ where: { email } });
      if (existsEmail)
        return cb(null, false, {
          message: 'Email already exists.',
        });
      // Create the user
      else {
        const { gender, preferences, username, age, weight } = req.body;
        const user = await prisma.user.create({
          data: {
            gender: gender,
            preferences: {
              unit: preferences.unit,
              standard: preferences.standard,
            },
            weight: { value: weight.value, unit: weight.unit },
            email: email,
            username: username,
            age: age,
            password: await hash(password),
          },
        });
        const goal = await prisma.goal.create({
          data: {
            user: { connect: { id: user.id } },
            unit: 'kg',
            lifts: {
              squats: undefined,
              benchPress: undefined,
              deadlift: undefined,
              pullup: undefined,
              shoulderPress: undefined,
            },
            weight: undefined,
            bodyFatPercentage: undefined,
          },
        });

        return cb(null, user);
      }
    } catch (err) {
      console.error(err);
      return cb(null, undefined);
    }
  })
); // Passport middleware to login users
passport.use(
  'login',
  new Strategy(options, async (req, email, password, cb) => {
    try {
      // Check if user found
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        return cb(null, false, {
          message: 'No user found.',
        });
      }
      // Compare password
      // if you make password required, this will be good
      const validPassword = await compare(password, user.password!);
      if (!validPassword) {
        return cb(null, false, {
          message: 'Invalid credentials.',
        });
      }
      return cb(null, user);
    } catch (err) {
      console.error(err);
      return cb(null, undefined);
    }
  })
);
