require("dotenv").config();

module.exports.select_where = function select_where(dbname,con){
      con.connect(function(err) {
        if (err) throw err;
        con.query(`SELECT * FROM ${dbname} WHERE GuildName = 'test'`, function (err, result) {
          if (err) throw err;
          console.log(result);
        });
      });
    }

module.exports.select_startswithLetter = function where_startswithLetter(dbame, con){
    ///Starts with letter
    con.connect(function(err) {
      if (err) throw err;
      /*Select all customers where the address starts with an "S":*/
      con.query(`SELECT * FROM ${dbame} WHERE name LIKE 'Y%'`, function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    });
    
  }

module.exports.select_1337  =  function select_1337(dbname,con,search_term){
  con.connect(function(err) {
    if (err) throw err;
    var adr = search_term;
    //Escape the address value:
    var sql = `SELECT * FROM ${dbname} WHERE GuildName = ?`;
    //Send an array with value(s) to replace the escaped values:
    con.query(sql, [adr], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
}