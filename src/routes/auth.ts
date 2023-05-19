import express from 'express';
const router = express.Router();
import * as authController from '../controllers/auth';
import passport from 'passport';

router.get('/', authController.auth_local);
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
