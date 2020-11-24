const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { v4 } = require('uuid');

const port = 3000;


const pathToCities = path.join(__dirname, 'dataBase', 'cities.json');

function readJson(path) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

function overwrite(path, content) {
    fs.writeFile(path, content, (err) => {
        if(err) {
            throw err
        }
    });
};

app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/cities', (req, res) => {
    const data = readJson(pathToCities);
    res.status(200).json(data);
})

app.post('/api/addCity', (req, res) => {
    const contact = {...req.body, id: v4() };
    const contacts = readJson(pathToCities);
    contacts.push(contact);
    overwrite(pathToCities, JSON.stringify(contacts, null, 4))
    res.status(201).json({ message: 'add city' })
})

app.delete('/api/deleteCity/:id', (req, res) => {
    const cities = readJson(pathToCities);
    const filtered = cities.filter(item => item.id !== req.params.id);
    overwrite(pathToCities, JSON.stringify(filtered, null, 4));
    res.status(200).json({ message: 'remove contact'});   
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})