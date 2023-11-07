const express = require('express');
const cors =require ('cors');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./auth');
const himpunanRoute = require("./src/routes/himpunan.routes");
const pemiluRoute = require("./src/routes/pemilu.routes");
const calonRoute = require('./src/routes/calon.routes');
const pemiluCalonRoute = require("./src/routes/pemilu_calon.routes")
const pemilihRoute = require ("./src/routes/pemilih.routes");
const kpuRoute = require("./src/routes/kpu.routes");
const authenticate = require("./auth")

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors( ));

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/localauth', authRoutes.isLoggedIn, (req, res) => {
  console.log(req.user)
  // res.send(`Selamat datang di Halaman Utama, ${req.user.displayName}!`);
  return res.json( {
    accessToken : authRoutes.generateToken(req.user),
    isKpu:req.user.isKpu
  })
});

// app.get('/tampilkan_pemilih_jika_login', (req, res) => {
//   const user_logged_in = true; // Gantikan ini dengan logika Anda untuk memeriksa login

//   if (user_logged_in) {
//     db.query('CALL tampilkan_pemilih_jika_login()', (error, results) => {
//       if (error) {
//         console.error('Error executing procedure:', error);
//         res.status(500).send('Internal Server Error');
//         return;
//       }

//       res.json(results[0]);
//     });
//   } else {
//     res.send('Silakan login terlebih dahulu');
//   }
// });

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/localauth', // Redirect setelah berhasil login
    failureRedirect: '/', // Redirect jika login gagal
    failureFlash: true // Aktifkan flash message jika login gagal
  })
);

app.get('/logout', (req, res) => {
  req.logOut();
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.sendStatus(500);
    }
    req.logOut();
    res.redirect('/');
  });
});

app.use('/auth', authRoutes.router);
app.use("/himpunan",himpunanRoute);
app.use("/pemilu",pemiluRoute);
app.use("/calon",authRoutes.verifyTokenKpu ,calonRoute);
app.use("/pemiluCalon",pemiluCalonRoute);
app.use("/pemilih",authenticate.verifyToken ,pemilihRoute);
app.use("/kpu",authenticate.verifyTokenKpu ,kpuRoute);

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:3000`);
});

module.exports = app