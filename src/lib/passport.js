const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {

    const rows = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await helpers.matchPassword(password, user.password)
      if (validPassword) {
        done(null, user);
      } else {
        done(null, false, {error:'Error password Incorrecto'});
      }
    } else {
      return done(null, false, {error: 'Error: usuario no existe'});
    }
  }));


passport.use('local.registrate', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
    const {name} =req.body;
    const newUser ={
        name,
        email,
        password,
    }
      newUser.password = await helpers.encryptPassword(password);
      const result = await pool.query('INSERT INTO users SET ?', newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
       
}));

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});