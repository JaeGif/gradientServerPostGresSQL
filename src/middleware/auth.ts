import passport from 'passport';
import Google from 'passport-google-oauth20';
import Github from 'passport-github2';
import { prisma } from '../utils/prisma.service';
const GoogleStrategy = Google.Strategy;
const GithubStrategy = Github.Strategy;

export default passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // find user
      console.log('here');
      console.log(profile);
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
