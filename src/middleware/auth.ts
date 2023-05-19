import passport from 'passport';
import { Express } from 'express';
import Google from 'passport-google-oauth20';
import Github from 'passport-github2';
import { prisma } from '../utils/prisma.service';
import { NextFunction } from 'express';
import { GithubProfile } from '../utils/Types';
const GoogleStrategy = Google.Strategy;
const GithubStrategy = Github.Strategy;

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
      console.log('here');
      console.log(profile);
      const user = await prisma.user.findFirst({
        where: {
          githubId: profile.id,
        },
      });
      if (!user) {
        const user = await prisma.user.create({
          data: {
            githubId: profile.id,
            email: profile._json.email,
            username: profile.username,
            age: 20,
          },
        });
      }
      done(null, profile);

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
