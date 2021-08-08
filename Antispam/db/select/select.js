require("dotenv").config();

module.exports.select_first = function select_first(dbname,con){
    return con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM ${dbname}`, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
      });
      
}

module.exports.select_fields = function select_fields(tablename, con){
  con.connect(function(err) {
    if (err) throw err;
    con.query(`SELECT GuildName, GuildId FROM ${tablename}`, function (err, result, fields) {
      if (err) throw err;
        console.log(fields)
    });
  });
  
}

///who is talking??????