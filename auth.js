const db = require("./src/config/database");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const pool = require("./src/config/database");
const express = require("express");

const router = express.Router(); 

const GOOGLE_CLIENT_ID = '465033587681-k838p4tuqdhjt5nl9vendfm8nnii1o2j.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    const user = req.user;
    const email = user.emails[0].value;
    // const sql = 'INSERT INTO pemilih (email) VALUES (?)';
    // db.query(sql, [email], function(error, results, fields) {
    //   if (error) throw error;
    //   console.log('Data login disimpan ke dalam database.');
    // });

    router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/localauth', // Redirect setelah berhasil login
    failureRedirect: '/', // Redirect jika login gagal
    failureFlash: true // Aktifkan flash message jika login gagal
  })
);


    router.get('/logout', (req, res) => {
      req.logout(); // Passport menyediakan fungsi logout untuk membersihkan sesi
      res.redirect('/'); // Redirect pengguna ke halaman utama setelah logout
    });
    // Redirect ke halaman utama setelah data disimpan
    res.redirect('/localauth');
  });

  async function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      req.user.isKpu=false
      const email = req.user.email;
      if (email.endsWith('@itk.ac.id')){
        req.user.isKpu=true
        req.header.user = req.user
        return next();
      }
      if (email.endsWith('@student.itk.ac.id')) {
        req.header.user = req.user
      //if req.user.email is in (kpuEmails)
        return next();
      }
    }
    
    res.sendStatus(401);
  }

  const jwt = require('jsonwebtoken');

  const JWT_SECRET = process.env.JWT_SECRET || 'Pumitk 2023 bismilah';


  generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
  }

  function verifyToken(req, res, next) {
    let auth = req.headers.authorization;
    if (!auth) {
      return res.status(403).send('Access denied');
    }
    let token = auth.split(" ")[1]
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err)
        return res.status(401).send('Invalid token');
      } 
      console.log(user)
      if(user.isKpu) {
        return res.status(403).send('Access denied');

      }
      req.user = user;
      next();
    });
  }

  function verifyTokenKpu(req, res, next) {
    let auth = req.headers.authorization;
    if (!auth) {
      return res.status(403).send('Access denied');
    }
    let token = auth.split(" ")[1]
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log(err)
        return res.status(401).send('Invalid token');
      }
      console.log(user)

      if(!user.isKpu) {
        return res.status(403).send('Access denied');

      }
      req.user = user;
      next();
    });
  }

 


module.exports = {router, isLoggedIn, generateToken, verifyToken, verifyTokenKpu};
