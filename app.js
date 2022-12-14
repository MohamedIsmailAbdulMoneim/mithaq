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
    cors()
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const getAllRecords = (req, res) => {
    const query = `
    SELECT m.id, m.serial_number, m.contract_date, m.contract_time, m.contract_place,
    m.Husband_name, m.wife_name, m.wife_custodian, m.moakhar, m.Additions, m.cost,
    m.data_register_date, m.maazon_name, m.envoy_name, m.status, m.notes, m.phoneNumber
    FROM main m order BY id DESC
    `
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ data: details });
        }
    })
}

const addRecord = (req, res) => {
    const { newData } = req.body

    if (newData.Additions.length === 0) delete newData.Additions

    Object.keys(newData).forEach(x => {
        // if (newData[x].length === 2) {
        //     delete newData[x]
        // }
        if (!Number(newData[x])) {
            newData[x] = `"${newData[x]}"`
        }
    })
    console.log(newData);

    const query = `insert into main (${Object.keys(newData)}) VALUES (${Object.values(newData)});`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({ details, msg: "تم إدخال البيانات بنجاح" });
            console.log(details);
        }
    })
}

const editRecord = (req, res) => {
    const { filteredNullData } = req.body
    console.log(filteredNullData);

    const { id } = filteredNullData
    delete filteredNullData.id
    delete filteredNullData.s

    Object.keys(filteredNullData).forEach(x => {
        if (!Number(filteredNullData[x])) {
            filteredNullData[x] = `"${filteredNullData[x]}"`
        }
    })



    const dataColumns = Object.keys(filteredNullData);




    const query = `UPDATE main SET ${dataColumns.map((x) => `${x} = ${filteredNullData[x]}`)} where id = ${id};`;

    db.query(query, function (err, inf) {
        // here, the queries are done
        if (err) {
            res.send(err)
            console.log(err);
        } else {
            res.json({ inf, msg: "تم إدخال البيانات بنجاح" });
        }
    });

}



app.get('/getallrecords', getAllRecords)
app.post('/addrecord', addRecord)
app.post('/editrecord', editRecord)
app.use(
    express.static("frontend/build")
);

app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'frontend', 'build', 'index.html')
    );

})


var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("connected on port " + port);
});