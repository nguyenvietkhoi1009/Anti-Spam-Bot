///create table (only dev)
require("dotenv").config();


module.exports.createTableGUild = function createTableGuild(tablename, con){
      con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = `CREATE TABLE IF NOT EXISTS ${tablename} (id INT AUTO_INCREMENT PRIMARY KEY, GuildName VARCHAR(255) NOT NULL, GuildID VARCHAR(255) NOT NULL, GuildJoin VARCHAR(255) NOT NULL, Info VARCHAR(255) NOT NULL) DEFAULT CHARSET=utf8mb4`;
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        });
      });
      con.end();
}


module.exports.alterTable = function alterTable(tablename, con, column){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = `ALTER TABLE ${tablename} ADD COLUMN ${column} INT NOT NULL`;
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table altered");
        });
      });
   
}
