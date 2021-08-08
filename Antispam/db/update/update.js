require("dotenv").config();


module.exports.update = function update(tablename,con,infoname,newinfo,oldinfo){ 
con.connect(function(err) {
    if (err) throw err;
    let sql = `UPDATE ${tablename} SET ${infoname} = '${newinfo + 1}' WHERE id = '1'`;
    
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });
 
}

