const express = require('express');
const app = express();
const userModel = require('./models/user');
const mongoose = require('mongoose');


app.set('view engine', 'ejs');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/read', async (req, res) => {
    let sortParam = req.query.sort;
    let sortObject = {};

    if (sortParam === 'name') {
        sortObject.name = 1;
    } else if (sortParam === 'email') {
        sortObject.email = 1;
    }

    let allusers = await userModel.find().sort(sortObject);
    res.render('read', { users: allusers });
});



app.get('/delete/:id', async (req, res) => {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect('/read');
});

app.get('/edit/:id', async (req, res) => {
    let updateuser = await userModel.findById(req.params.id);
    res.render('edit',{user: updateuser});
});

app.get('/add', (req, res) => {
  res.render('add');
});


app.post('/edit/:id', async (req, res) => {
    let updateuser = await userModel.findOneAndUpdate({"_id": req.params.id}, {
        image: req.body.image,
        name: req.body.name,
        email: req.body.email,
    },
    { new: true });
    res.redirect('/read');
});

app.post('/create', async (req, res) => {
    let createduser = await userModel.create({
        image: req.body.image,
        name: req.body.name,
        email: req.body.email,
    })
    res.redirect('/read');
});
app.listen(3000);