const mysqlDao = require('./loadData')

var res = null;

function processData(result) {
    var data = JSON.stringify(result)
    res = JSON.parse(data);

    //console.log(res);
}

function dbTrainInfo(tabelName) {
    var sql = `select * from ` + tabelName;
    //processData为回调方法
    mysqlDao.queryDataBySQL(sql, processData);

    console.log("rse = " + res);
    return res;
}


module.exports = {
    dbTrainInfo
}