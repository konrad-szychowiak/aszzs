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
    // db.exec(`drop table if exists products;`)
    db.exec(`create table products
             (
                 id number primary key,
                 name
             );`)
    // db.exec(``)
    res.send({ message: "created" })
})

app.listen('3000', () => {
    console.log('Server Started on port 3000')
})

app.post('/update', (req, res) => {
    console.log(req.body)
    // const answer = db.prepare(``).all()
    res.send({ message: 'added product' })
})

app.get('/list', (req, res) => {
    const answer = db.prepare(`select * from products;`).all()
    console.log(answer)
    res.send({ message: 'list' })
})

// const usun = async(ctx) => {
//     const result = await sql`update database set ilosc = ilosc - 1;`
// }
//
// const lista = async(ctx) => {
//     const result = await sql`select * from database order by kategoria, nazwa;`
//     if (result) ctx.body = result
// }
//
// const jeden = async(ctx) => {
//     const {code_id} = ctx.params
//     const result = await sql`select * from database where code_id = ${code_id};`
//     if (result) ctx.body = result
// }
//
// export default new Router()
//     .post('/', dodaj)
//     .post('/', usun)
//     .get('', lista)
//     .get('/:code_id', jeden)
