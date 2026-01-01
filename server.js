console.log('Web serverni boshlash');
const express = require('express');
const app = express();
const http = require("http");
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
    if (err) {
        console.log('ERROR:', err);
    }else {
        user = JSON.parse(data)
    }
});


// -------------- 1 kirish code

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// -------------- 2 sessions

// ------------ 3 views code
app.set('views','views');
app.set('view engine','ejs');

// ------------ 4 routing code
app.post('/create-item', (req, res) => {
    console.log(req.body);
    res.json({test: "success"});
});

app.get('/author', (req, res) => {
    res.render("author", {user: user } );
});

app.get("/", function (req, res) {
    res.render('reja');
});

// app.get(function (req, res) {
//     res.end("<h1>Hello sqdsadasWorld</h1>");
// });
// app.get("/", function (req, res) {
//     res.render("harid");
// });

// const server = http.createServer(app);
// let PORT = 3000; // chatGPT orqali 4000 port ishlatsa ishlab ketishini aniqladim, PORT: 3000  busy deyildi!!!
// server.listen(PORT, function() {
//     console.log(`The server is running successfully on port: ${PORT}`);
// });

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err.message);
});
