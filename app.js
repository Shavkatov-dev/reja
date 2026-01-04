console.log('Web serverni boshlash');
const express = require('express');
const app = express();
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
    if (err) {
        console.log('ERROR:', err);
    }else {
        user = JSON.parse(data)
    }
});

// MongoDB Connect
const db = require("./server").db();
const mongodb = require("mongodb");
// db -Qalam , database da yozib chizadi
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
    console.log('user entered /create-item')
    console.log(req.body);
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => {
        res.json(data.ops[0]);
    })
});

// app.post("/delete-item", (req, res) => {
//     const id= req.body.id;
//     db.collection("plans").deleteOne(
//          {_id: new mongodb.Object(id)}, function (err, data) {
//         res.json({state: "success"});
//     });
// });
app.post("/delete-item", (req, res) => {
    const id = req.body.id;

    if (!mongodb.ObjectId.isValid(id)) {
        return res.status(400).json({ state: "invalid_id" });
    }

    db.collection("plans").deleteOne(
        { _id: new mongodb.ObjectId(id) },
        function (err, result) {
            if (err) {
                return res.status(500).json({ state: "error" });
            }

            if (result.deletedCount === 0) {
                return res.status(404).json({ state: "not_found" });
            }

            res.json({ state: "success" });
        }
    );
});


app.get('/author', (req, res) => {
    res.render("author", {user: user } );
});

app.get("/", function (req, res) {
    console.log('user entered /')
    db.collection("plans").find().toArray((err, data)=> {
        if (err) {
            console.log(err);
            res.end("something went wrong");
        } else {
            console.log(data);
            res.render("reja", {items: data});
;        }
    });
});

// app.get(function (req, res) {
//     res.end("<h1>Hello sqdsadasWorld</h1>");
// });
// app.get("/", function (req, res) {
//     res.render("harid");
// });

module.exports = app;



