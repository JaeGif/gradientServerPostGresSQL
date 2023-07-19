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
      console.log('passing');

      const user = await prisma.user.findFirst({
        where: {
          githubId: profile.id,
        },
      });
      console.log(user);
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
      console.log('tokens', accessToken, refreshToken);
      done(null, user);

      /*       const user = prisma.user.findFirst({
        where: { accountId: profile.id, provider: 'github' },
      });
      // if user isn't real do stuff
      if (!user) {
        const user = await prisma.user.create({
          accountId: profile.id,
          username: profile.username,
          provider: profile.provider,
        });
        return cb(null, profile);
      } */
    }
  )
);
/* 
{
  id: '105343665',
  nodeId: 'U_kgDOBkdqsQ',
  displayName: 'Jacob Gifford',
  username: 'JaeGif',
  profileUrl: 'https://github.com/JaeGif',
  photos: [
    { value: 'https://avatars.githubusercontent.com/u/105343665?v=4' }
  ],
  provider: 'github',
  _raw: '{"login":"JaeGif","id":105343665,"node_id":"U_kgDOBkdqsQ","avatar_url":"https://avatars.githubusercontent.com/u/105343665?v=4","gravatar_id":"","url":"https://api.github.com/users/JaeGif","html_url":"https://github.com/JaeGif","followers_url":"https://api.github.com/users/JaeGif/followers","following_url":"https://api.github.com/users/JaeGif/following{/other_user}","gists_url":"https://api.github.com/users/JaeGif/gists{/gist_id}","starred_url":"https://api.github.com/users/JaeGif/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/JaeGif/subscriptions","organizations_url":"https://api.github.com/users/JaeGif/orgs","repos_url":"https://api.github.com/users/JaeGif/repos","events_url":"https://api.github.com/users/JaeGif/events{/privacy}","received_events_url":"https://api.github.com/users/JaeGif/received_events","type":"User","site_admin":false,"name":"Jacob Gifford","company":null,"blog":"https://jgifford.dev/","location":"San Francisco","email":null,"hireable":null,"bio":"Full Stack Developer\\r\\n","twitter_username":null,"public_repos":50,"public_gists":0,"followers":14,"following":29,"created_at":"2022-05-11T07:00:31Z","updated_at":"2023-05-17T23:48:25Z"}',
  _json: {
    login: 'JaeGif',
    id: 105343665,
    node_id: 'U_kgDOBkdqsQ',
    avatar_url: 'https://avatars.githubusercontent.com/u/105343665?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/JaeGif',
    html_url: 'https://github.com/JaeGif',
    followers_url: 'https://api.github.com/users/JaeGif/followers',
    following_url: 'https://api.github.com/users/JaeGif/following{/other_user}',
    gists_url: 'https://api.github.com/users/JaeGif/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/JaeGif/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/JaeGif/subscriptions',
    organizations_url: 'https://api.github.com/users/JaeGif/orgs',
    repos_url: 'https://api.github.com/users/JaeGif/repos',
    events_url: 'https://api.github.com/users/JaeGif/events{/privacy}',
    received_events_url: 'https://api.github.com/users/JaeGif/received_events',
    type: 'User',
    site_admin: false,
    name: 'Jacob Gifford',
    company: null,
    blog: 'https://jgifford.dev/',
    location: 'San Francisco',
    email: null,
    hireable: null,
    bio: 'Full Stack Developer\r\n',
    twitter_username: null,
    public_repos: 50,
    public_gists: 0,
    followers: 14,
    following: 29,
    created_at: '2022-05-11T07:00:31Z',
    updated_at: '2023-05-17T23:48:25Z'
  }
}
*/

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
    console.log(payload);
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
      console.log(email, password);
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
      if (!user)
        return cb(null, false, {
          message: 'No user found.',
        });
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
