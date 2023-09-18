const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'sys'
});
function queryDataBySQL(sql, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                //console.log("query:" + result);
                callback(result);
            }
        });
        connection.release();
        //console.log("close mysql connection");
    });
};


module.exports = {
    queryDataBySQL
};
