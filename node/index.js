const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

var sql = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, nome varchar(255),primary key(id));`
connection.query(sql)

sql = `INSERT INTO people(nome) values('Fulano da Silva');`
connection.query(sql)
connection.end();

app.get('/', (req,res) => {
    var str = '<h1>Full Cycle Rocks</h1><br/>'; 
    
    const connection = mysql.createConnection(config);
    sql = `SELECT * FROM people;`;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        for (var i = 0, len = rows.length; i < len; i++) {
            str += ('<h3>' + rows[i].id + ' - ' + rows[i].nome + '</h3>')
        }
        res.send(str);
    });
    connection.end();
    
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})