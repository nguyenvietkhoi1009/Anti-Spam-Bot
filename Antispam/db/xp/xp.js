
///xp
module.exports.xp = function xp(message,con){


  function generateXp(){
    let min = 5;
    let max = 10;

    return Math.floor(Math.random()* (max-min+1)) +min;
  }

  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err,rows) => {
    if(err) throw err;

    let sql;

    if(rows.length<1){
      sql = `INSERT INTO xp (id,xp) VALUES ('${message.author.id}', ${generateXp()})`;
    }else{
      let   xp = rows[0].xp;

      sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}'`;
    }

    con.query(sql)
    console.log(rows)
  })

    }
