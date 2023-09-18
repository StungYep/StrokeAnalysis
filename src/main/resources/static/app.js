const express = require('express')
const path = require('path')
const mysql = require('mysql');
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'sys'
});

connection.connect();

function queryDatabase(tableName) {
    var sql = "select * from " + tableName;
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.stringify(results));
            }
        });
    });
}


app.listen(8080, () => {
    console.log('listening port 8080')
});

app.get('/loadFromDB', async(req, res) => {
    const tableName = req.query.tableName;
    console.log(tableName);
    try {
        const result = await queryDatabase(tableName);
        console.log(result);
        res.send(result);
    } catch (error) {
       // console.error(error);
        res.send([]);
    }
});