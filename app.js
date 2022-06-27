const express = require("express");
const app = express();
const port = 3000;


var admin = require("firebase-admin");

var serviceAccount = require("./service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


