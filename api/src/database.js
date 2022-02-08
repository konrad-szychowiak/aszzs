const express = require('express');
const bodyParser = require('body-parser');
const db = require('better-sqlite3')('database.sqlite3', {
    verbose: console.log
});
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })

app.get('/createdb', (req, res) => {
    // db.exec(`-- drop table if exists log;`)
    db.exec(`drop table if exists products;`)
    db.exec(`create table products
             (
                 code     number primary key,
                 name,
                 reserve  numeric,
                 critical numeric default 1,
                 medium   numeric default 2
             );`)
    // db.exec(``)
    res.send({message: "created"})
})

app.listen('3000', () => {
    console.log('Server Started on port 3000')
})

app.post('/update', (req, res) => {
    const {code, name, reserve, critical, medium} = req.body
    const [answer] = db.prepare(`update products
                               set name     = '${name}',
                                   reserve  = ${reserve},
                                   critical = ${critical},
                                   medium   = ${medium}
                               where code = ${code}
        returning *
    `).all()
    console.log(answer)
    res.send({answer})
})

app.get('/list', (req, res) => {
    const answer = db.prepare(`select *
                               from products;`).all()
    console.log(answer)
    res.send(answer)
})

app.get('/one/:code', (req, res) => {
    const [answer] = db.prepare(`select *
                                 from products
                                 where code = ${req.params.code}
                                 limit 1`).all()
    console.log(answer)
    res.send({...answer})
})

app.post('/create', (req, res) => {
    console.log(req.body)
    const {code, name, reserve} = req.body;
    const [answer] = db.prepare(`insert into products ("code", "name", "reserve")
                                 values (${code}, '${name}', ${reserve}) returning *;`).all()
    res.send({message: "Created new product", created: answer})
})

app.delete('/product/:code', (req, res) => {
    const {code} = req.params
    console.log({code})
    db.exec(`delete from products where "code" = ${code}`)
    res.send({message: 'deleted'})
})