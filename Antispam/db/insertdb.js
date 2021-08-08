require("dotenv").config();


///small insert
module.exports.insertGuild = function insertGuild(tablename, guild, con){
      con.connect(function(err) {
      //date
      let today = new Date();
      today = today.toISOString().substring(0, 10);
      //
      if (err) throw err;
      console.log("Connected!");
      let sql = `INSERT INTO ${tablename.toString()} (GuildName, GuildId, GuildJoin, Info) VALUES ? `;
      let values = [
        [guild.name, guild.id.toString(), today.toString(), guild.ownerID.toString()]
      ];
      con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });

}


// sql values ? => big array

//insertdb_many()