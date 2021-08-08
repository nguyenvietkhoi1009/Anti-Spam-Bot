require("dotenv").config();

module.exports.drop_tables = function drop_tables(tablename, con){

con.connect(function(err) {
    if (err) throw err;
    var sql = `DROP TABLE ${tablename}`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");
    });
  });

}