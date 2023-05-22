import passport from 'passport';
import LocalStrategy from 'passport-local';
import JWTStrategy from 'passport-jwt';
import bcrypt from 'bcrypt';
import JWT_SECRET from '../config.js';
import User from '../dao/models/User.js';
import logger from '../logger.js';

export default function configurePassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use( 
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            logger.warn('Usuario no encontrado');
            return done(null, false, { message: 'Usuario no encontrado' });
          }
          const match = await bcrypt.compare(password, user.password);
          if (!match) {
            logger.warn('Contraseña incorrecta');
            return done(null, false, { message: 'Contraseña incorrecta' });
          }
          return done(null, user);
        } catch (error) {
          logger.error(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: (req) => req.cookies.jwt,
        secretOrKey: JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await User.findById(jwtPayload.sub);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          logger.error(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      logger.error(error);
      done(error);
    }
  });

  return passport;
};