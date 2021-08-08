require("dotenv").config();

module.exports.delete_where = function delete_where(tablename,con,info,info2){
    return con.connect(function(err) {
        if (err) throw err;
        var sql = `DELETE FROM ${tablename} WHERE ${info} = '${info2}'`;
        con.query(sql, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });
      
}


//
