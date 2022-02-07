const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 2))
})

app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql,err => {
        if(err) {
            throw err
        }
        res.send("Database created");
    })
})

app.listen('3000', () => {
    console.log('Server Started on port 3000')
})

const dodaj = async(ctx) => {
    const result = await sql`update database set ilosc = ilosc + 1;`
}

const usun = async(ctx) => {
    const result = await sql`update database set ilosc = ilosc - 1;`
}

const lista = async(ctx) => {
    const result = await sql`select * from database order by kategoria, nazwa;`
    if (result) ctx.body = result
}

const jeden = async(ctx) => {
    const {code_id} = ctx.params
    const result = await sql`select * from database where code_id = ${code_id};`
    if (result) ctx.body = result
}

export default new Router()
    .post('/', dodaj)
    .post('/', usun)
    .get('', lista)
    .get('/:code_id', jeden)
