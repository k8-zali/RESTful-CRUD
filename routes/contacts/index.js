const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const firestore = admin.firestore();

router.get('/list', async (req, res) => {
    const snapshot = await firestore.collection('contacts').get();
    let arr = [];

    snapshot.forEach((doc) => {
        arr.push({id: doc.id, ...doc.data()});
      });
      res.status(200).send(arr);
});

router.post('/add', async (req, res) => {
    const name = req.body && req.body.name;
    const age = req.body && req.body.age;

    await firestore.collection('contacts').add({
        name: name,
        age: age
    });

    res.status(200).send("Coolio");
});

router.delete('/delete', async (req, res) => {
    const id = req.query && req.query.id;
    console.log(id);
    await firestore.collection('contacts').doc(id).delete();

    res.status(200).send("Coolio, deleted!");
});

router.patch('/patch', async (req, res) => {
    const id = req.body && req.body.id;
    const name = req.body && req.body.name;
    const age = req.body && req.body.age;
    var contact = {};

    if (!id || !id.length) return;

    if (name && name.length) contact.name = name;
    if (age && age.length) contact.age = age;

    if (!Object.keys(contact).length) return;

    await firestore.collection('contacts').doc(id).update(contact);

    res.status(200).send("Updated!");
});

module.exports = router;