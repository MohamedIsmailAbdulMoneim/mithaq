const express = require("express");
const app = express()
const cors = require("cors")
const session = require('express-session');
const db = require("./database/connection")
const path = require('path')
require('dotenv').config();
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    resave: false,
    saveUninitialized: false
}));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getAllRecords = (req, res) => {
    const query = `select * from main;`
    db.query(query, (err, details) => {
        if (err) {

        } else {
            res.json({ data: details });
        }
    })
}
const addRecord = (req, res) => {
    const query = `insert into main (${Object.keys(req.body)}) VALUES (${Object.values(req.body)});`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
            if (err.sqlMessage.indexOf("Duplicate entry") !== -1) {
                res.json({ data: [[], []], msg: "تم إدخال البيانات من قبل" })
            }
        } else {
            console.log('done');
            res.json({ data: details, msg: "تم إدخال البيانات بنجاح" });
        }
    })
}

const editRecord = (req, res) => {
    console.log(req.body);
    // const query = `insert into main (${Object.keys(req.body)}) VALUES (${Object.values(req.body)});`
    // db.query(query, (err, details) => {
    //     if (err) {
    //         console.log(err);
    //         if (err.sqlMessage.indexOf("Duplicate entry") !== -1) {
    //             res.json({ data: [[], []], msg: "تم إدخال البيانات من قبل" })
    //         }
    //     } else {
    //         console.log('done');
    //         res.json({ data: details, msg: "تم إدخال البيانات بنجاح" });
    //     }
    // })
}



app.get('/getallrecords', getAllRecords)
app.post('/addrecord', addRecord)
app.post('/editrecord', editRecord)

app.use(
    express.static("frontend/build")
  );

app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'frontend' ,'build', 'index.html')
    );

})


var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("connected on port " + port);
});