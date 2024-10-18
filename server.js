const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();
const PORT = 3000;

// MiddleWare pour analyser le corps des requetes
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour gérer les sessions
app.use(session({
    secret: 'cle_Secrete',
    resave: false,
    saveUninitialized: true
}));

// Middleware pour servir des fichiers statiques
app.use(express.static('public'));

// const requireAuth = (req,res,next) => {
//     if(req.session && req.session.user) {
//         //si user authentifié, on continue
//         return next();
//     } else {
//         // sinon renvoyer une erreur : non autorisée
//         return res.status(401).json({error:'Unauthorized'});
//     }
// };

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

// app.get('/users', requireAuth, (req,res) => {
//     res.json(users);
// })

// Route de connexion
app.post('/login', (req,res) => {
    const {username, password} = req.body;
    // Recherche user dans la liste
    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        //Authent réussie, stocker user dans la session
        req.session.user = user;
        res.redirect('membre.html');
    } else {
        res.send('Unauthorized');
    }
});

// // route de déconnexion 
// app.post('/logout', (req,res) => {
//     req.session.destroy(err =>{
//         //déco de l'user en supprimant sa session
//         if (err){
//             console.error(err);
//             res.status(500).json({error: 'Server error'});
//         } else {
//             res.json({message: 'Logout succesful'});
//         }
//     });
// });


// Demarrer le server
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});