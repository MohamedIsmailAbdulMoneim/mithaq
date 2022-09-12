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
    const query = `
    SELECT m.id, m.serial_number, m.contract_date, m.contract_time, m.contract_place,
    m.Husband_name, m.wife_name, m.wife_custodian, m.moakhar, m.Additions, m.cost,
    m.data_register_date, m.maazon_name, m.envoy_name, m.status, m.notes,(SELECT GROUP_CONCAT('{"phoneNumber": "', p.phone_number, '", "id": "', p.id, '"}', ',') FROM phones p WHERE p.main_id = m.id) as phoneNumbers
    FROM main m
    `
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
        } else {
            console.log(details);
            res.json({ data: details });
        }
    })
}

const addRecord = (req, res) => {
    const { newData, phoneNums } = req.body
    const reAranged = Object.values(phoneNums).filter(x => x.length > 2)
    
    Object.keys(newData).forEach(x => {
        if(newData[x].length === 2 ){
            delete newData[x]
        }
        if(!Number(newData[x])){
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
            
        } else {
            console.log(details.insertId);
            // console.log(reAranged.map(x => [1, x]));
            db.query('insert into phones (phone_number, main_id) values ?;', [reAranged.map(x => [x, details.insertId])], (err,data)=> {
                console.log('hit');
                if(err) {
                    console.log(err);
                    if (err.sqlMessage.indexOf("Duplicate entry") !== -1) {
                        res.json({ data: [[], []], msg: "تم إدخال البيانات من قبل" })
                    }else {
                        console.log('done');
                        res.json({ data, msg: "تم إدخال البيانات بنجاح" });
                    }
                }
            })
            
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
    // const object = {
    //     id: 1,
    //     firstName: "John",
    //     lastName: "Doe"
    // };
    
    // const columns = Object.keys(object);
    // const values = Object.values(object);
    
    // let sql = "UPDATE tableName SET '" + columns.join("' = ? ,'") +"' = ?";
    
    // connection.query(sql, values, (error, result, fields) => {
    //     //do what you must here.
    // });
}



app.get('/getallrecords', getAllRecords)
app.post('/addrecord', addRecord)
app.post('/editrecord', editRecord)

// app.use(
//     express.static("frontend/build")
//   );

// app.get("*", (req, res) => {
//     res.sendFile(
//         path.resolve(__dirname, 'frontend' ,'build', 'index.html')
//     );

// })


var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("connected on port " + port);
});