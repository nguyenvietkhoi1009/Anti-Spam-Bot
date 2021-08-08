
///xp
module.exports.lvl = function lvl(message,con){


  function generateXp(){
    let min = 5;
    let max = 10;

    return Math.floor(Math.random()* (max-min+1)) +min;
  }





  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err,rows) => {
    function lvl_(){
      if(rows[0].xp>1000){
        sql = `UPDATE xp SET xp = 0 WHERE id = '${message.author.id}'`;
        con.query(sql)
        return 1;
      }else{
        return 0;
      }
    }
    if(err) throw err;

    let sql;

    if(rows.length<1){
      sql = `INSERT INTO xp (id,xp,lvl) VALUES ('${message.author.id}', ${generateXp()}, ${lvl_()})`;
    }else{
      let xp = rows[0].xp;
      let lvl = rows[0].lvl;
      sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;
      con.query(sql)
      sql = `UPDATE xp SET lvl = ${lvl + lvl_()} WHERE id = '${message.author.id}'`;
    }

    con.query(sql)
    console.log(rows)

    })

    }
