const express = require("express");
const app = express()
const cors = require("cors")
const session = require('express-session');
const db = require("./database/connection")
const path = require('path')
require('dotenv').config();
var queues = require('mysql-queues');
const DEBUG = true;
queues(db, DEBUG);


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
    m.data_register_date, m.maazon_name, m.envoy_name, m.status, m.notes,(SELECT GROUP_CONCAT('{"phoneNumber": "', p.phone_number, '", "id": "', p.id, '"}', ',') FROM phones p WHERE p.main_id = m.id) as phoneNumber
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
    const { newData, phoneNums } = req.body


    const reAranged = Object.values(phoneNums).filter(x => x.length > 2)
    if(newData.Additions.length === 0 ) delete newData.Additions

    Object.keys(newData).forEach(x => {
        if (newData[x].length === 2) {
            delete newData[x]
        }
        if (!Number(newData[x])) {
            newData[x] = `"${newData[x]}"`
        }
    })
    Object.keys(phoneNums).forEach(x => {
        phoneNums[x] = `"${phoneNums[x]}"`
    })



    const query = `insert into main (${Object.keys(newData)}) VALUES (${Object.values(newData)});`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
            res.send(err);

        } else {
            if(reAranged.length > 0){
                db.query('insert into phones (phone_number, main_id) values ?;', [reAranged.map(x => [x, details.insertId])], (err, data) => {
                    if (err) console.log(err);
                    else res.json({ data, msg: "تم إدخال البيانات بنجاح" });   

                })   
            }
            if(reAranged.length === 0){
                res.json({ details, msg: "تم إدخال البيانات بنجاح" }); 
            }
            console.log(details);

        }
    })
}

const editRecord = (req, res) => {
    const { filteredNullData, phoneNums, newPhones } = req.body

    const { id } = filteredNullData
    const reAranged = phoneNums.filter(x => x.phoneNumber.length > 2)
    if(filteredNullData.contract_date) {
        if(filteredNullData.contract_date.length === 0) filteredNullData.contract_date = '0000-00-00'
    }
    delete filteredNullData.id
    delete filteredNullData.s
    delete filteredNullData.phoneNumber
    console.log(filteredNullData);
    Object.keys(filteredNullData).forEach(x => {
        if (!Number(filteredNullData[x])) {
            filteredNullData[x] = `"${filteredNullData[x]}"`
        }
    })
    reAranged.forEach(x => {
        x.phoneNumber = `"${x.phoneNumber}"`
    })
    Object.keys(newPhones).forEach(x => {
        if (newPhones[x].length === 0) delete newPhones[x];
        else newPhones[x] = `"${newPhones[x]}"`
    })

    const dataColumns = Object.keys(filteredNullData);
    const phonesValue = String(reAranged.map(x => `update phones set phone_number = ${x.phoneNumber} where id = ${x.id};`)).replace(/,/g, '');
    const newPhonesValue = Object.values(newPhones);
    var trans = db.startTransaction();

    console.log(`UPDATE main SET ${dataColumns.map((x) => `${x} = ${filteredNullData[x]}`)} where id = ${id};`)
    if (dataColumns.length > 0) trans.query(`UPDATE main SET ${dataColumns.map((x) => `${x} = ${filteredNullData[x]}`)} where id = ${id};`);
    if (phonesValue.length > 0) trans.query(`${phonesValue}`)
    if (newPhonesValue.length > 0) trans.query(`insert into phones (phone_number, main_id) values ${newPhonesValue.map(x => `(${x}, ${id})`)};`);
    trans.commit(function (err, inf) {
        // here, the queries are done
        if (err) {
            res.send(err)
            // console.log(err);
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


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("connected on port " + port);
});