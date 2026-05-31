// Express framework ko import karta hai
const express = require('express');
// Express application ka instance banate hain
const app = express();
// Session management ke liye middleware
const expressSession = require('express-session');
// Flash messages (temporary messages) ke liye
const flash = require('connect-flash');
// CORS header set karne ke liye
const cors = require('cors');
// Cookie parsing ke liye middleware
const cookieParser = require('cookie-parser');
// HTTP request logging ke liye
const morgan = require('morgan');

// Example middleware (commented) — har request ke liye kuch run karna
// app.use(function(req,res,next){
//     console.log('Middleware Running');
//     next();
// })

// Session middleware ko enable karte hain
app.use(
    expressSession({
        // session sign/verify karne ke liye secret
        secret: "random",
        // agar session sirf change hone par hi save karna ho
        resave: false,
        // bina session data ke naye session ko save na kare
        saveUninitialized: false,
    })
);

// ----- Session example (commented out) -----

// Example route jo session banaata hai (commented)
// app.get('/create',(req,res)=>{
//     req.session.details = {
//         name : "abhishek",
//         age : 22
//     }
//     res.send('Session Created')
// })


// Example route jo session data check karta hai (commented)
// app.get('/check',function(req,res){
//     console.log(req.session.details);
// })


// Connect-flash middleware enable karte hain (temporary messages ke liye)
app.use(flash());

// CORS middleware enable karte hain taaki cross-origin requests allow ho
app.use(cors());

// Agar chaho to specific route pe bhi CORS enable kar sakte ho:
// app.get('/route', cors(), (req,res) => {})

// Cookies ko parse karne ke liye middleware use karte hain
app.use(cookieParser());

// HTTP request logging - development format
app.use(morgan('dev'));

// Route jo cookie set karta hai
app.get('/createCookie', function (req, res) {
    // response me cookie set karna: key 'name', value 'Abhishek'
    res.cookie('name', 'Abhishek');
    res.send('Cookie Setted');
});

// Route jo cookies read karta hai
app.get('/checkCookie', function (req, res) {
    // parsed cookies ko console me dikhate hain
    console.log(req.cookies.name);
    res.send('Cookie Reading');
});

// Route with URL parameter 'username' — params se value lete hain
app.get('/profile/:username', function (req, res) {
    res.send(req.params.username);
});

// Route with multiple params: username aur age
app.get('/author/:username/:age', function (req, res) {
    res.send(
        'something about ' + req.params.username + ' who is of age ' + req.params.age
    );
});


// Root route
app.get('/', (req, res) => {
    res.send('server running');
});

// Example: set a flash message and redirect
app.get('/flash', (req, res) => {
    // 'data' key me temporary message store hoti hai
    req.flash('data', 'Message');
    res.redirect('/error');
});

// Route jo flash message dikhata hai
app.get('/error', (req, res) => {
    let msg = req.flash('data');
    res.send(msg);
});

// Universal fallback route — agar koi aur route match na ho
app.get('*', (req, res) => {
    res.send('This is universal Route');
});

// Server start karte hain port 3000 pe
app.listen(3000);