import express from 'express';
const router = express.Router();
import * as authController from '../controllers/auth';
import passport from 'passport';

router.post(
  '/local',
  passport.authenticate('local', { session: false }),
  authController.auth_local
);
router.post('/register', authController.auth_register);

router.post('/google', authController.auth_google);
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile'],
  }),
  authController.auth_github
);
router.get(
  '/github/redirect',
  passport.authenticate('github'),
  authController.auth_github_redirect
);

export default router;
