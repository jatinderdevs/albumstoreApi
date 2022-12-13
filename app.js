require('dotenv').config();
require('express-async-errors');

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cros = require('cors');
const album = require('./routes/album');
const auth = require('./routes/auth');
app.use(express.json());
//handle CROS policies
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cros());
app.use(album);
app.use(auth);
app.use(function (err, req, res, next) {
    //here you can log the excpations

    return res.status(500).send(err);
})
mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        app.listen(process.env.PORT || 8080, () => {
            console.log(`Listing On ${process.env.PORT}`);
        });
    })
    .catch(err => { console.log(err) });

    //local
// mongodb://localhost:27017/firstreact