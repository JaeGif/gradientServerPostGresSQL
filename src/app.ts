import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/user';
import workoutRouter from './routes/workout';
import exerciseRouter from './routes/exercise';
import performedExerciseRouter from './routes/performedExercise';
import standardizedPerformanceRouter from './routes/standardizedPerformances';
import goalRouter from './routes/goal';
import noteRouter from './routes/note';
import authRouter from './routes/auth';
import authMiddleware from './middleware/auth';
import session from 'express-session';
import passport from 'passport';
import cookieSession from 'cookie-session';

const authMiddleWareUser = authMiddleware;

app.use(
  session({
    secret: process.env.SESSION_KEY_EXPRESS_S!,
    resave: false,
    saveUninitialized: false,
    cookie: {},
    name: 'session',
  })
);
require('dotenv').config();

/* app.use(auth.initialize());
passport.use(new localStrategy(function (user, done) {
  done(null, user)

}));
User.authenticate()
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done) {
  done(null, user);
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/api', userRouter);
app.use('/api', workoutRouter);
app.use('/api', exerciseRouter);
app.use('/api', performedExerciseRouter);
app.use('/api', standardizedPerformanceRouter);
app.use('/api', goalRouter);
app.use('/api', noteRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
