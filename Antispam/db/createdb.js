require("dotenv").config();

///create db (only dev)

module.exports.createDB = function createDB(dbname,con){
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(`CREATE DATABASE IF NOT EXISTS ${dbname}`, function (err, result) {
      if (err) throw err;
      console.log("Database Created");
    });
  });
  
}

