const express = require("express");
const app = express()
const cors = require("cors")
const session = require('express-session');
const db = require("./database/connection")
const path = require('path')
const { protect } = require('./middleware/authMiddleware')
const { errorHandler } = require('./middleware/errorMiddleware');
const { registerUser, loginUser } = require('./controllers/userController')
const fs = require('fs')
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

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
    SELECT m.id, m.serial_number, m.contract_date, m.contract_time, m.contract_place, m.address,
    m.Husband_name, m.wife_name, m.wife_custodian, m.moakhar, m.Additions, m.cost, m.contract_type, m.contract_issuer,
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

    const query = `insert into main (${Object.keys(newData)}) VALUES (${Object.values(newData)});`
    db.query(query, (err, details) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json({ details, msg: "تم إدخال البيانات بنجاح" });
        }
    })
}

const editRecord = (req, res) => {
    const { filteredNullData } = req.body

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

const getRecData = (req, res) => {
    console.log('hit');
    const data = req.body
    console.log({
        Husband_name: data.Husband_name,
        wife_name: data.wife_name,
        phoneNumber: data.phoneNumber,
        contract_type: data.contract_type,
        address: data.address,
        contract_date: data.contract_date,
        contract_time: data.contract_time,
        cost: data.cost,
        moakhar: data.moakhar,
        maazon_name: data.maazon_name,
        envoy_name: data.envoy_name,
        serial_number: data.serial_number
    });

    const content = fs.readFileSync(
        path.resolve(__dirname, "./template.docx"),
        "binary"
    );
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.render({
        Husband_name: data.Husband_name,
        wife_name: data.wife_name,
        phoneNumber: data.phoneNumber,
        contract_type: data.contract_type,
        address: data.address,
        contract_date: data.contract_date,
        contract_time: data.contract_time,
        cost: data.cost,
        moakhar: data.moakhar,
        maazon_name: data.maazon_name,
        envoy_name: data.envoy_name,
        serial_number: data.serial_number
    });
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: "DEFLATE",
    });

    fileLocation = path.resolve(__dirname, "./output.docx")
    fs.writeFile(fileLocation, buf, (err) => {
        if (err) console.log(err);

        res.download(fileLocation, '2.xlsx', (err) => {
            if (err) console.log(err);
        });


    })



}

app.get('/getallrecords', protect, getAllRecords)
app.post('/getrecdata',protect, getRecData)
app.post('/addrecord', protect, addRecord)
app.post('/editrecord', protect, editRecord)
app.post('/register', registerUser)
app.post('/login', loginUser)


app.use(
    express.static("frontend/build")
);

app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'frontend', 'build', 'index.html')
    );

})

app.use(errorHandler);


var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log("connected on port " + port);
});