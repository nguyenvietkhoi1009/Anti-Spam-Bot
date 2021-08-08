const Canvas = require('canvas');
const { registerFont } = require('canvas')
registerFont("./tempcommands/fonts/OpenSans-Regular.ttf", { family: 'FontName' });
const Discord = require('discord.js');


const mysql = require('mysql');
const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port:process.env.PORT,
    database:process.env.DATABASE
});


module.exports.card_ = async function card_(message){
  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}'`, (err,rows) => {

  const canvas = Canvas.createCanvas(280, 180);
  const ctx = canvas.getContext('2d');


	ctx.strokeStyle = '#A9F5D0';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);


  ctx.rect(4, 4, canvas.width*0.98, canvas.height*0.97)
  ctx.fillStyle = "#000000";
  ctx.fill()


	// Slightly smaller text placed above the member's display name

  ctx.font = '24.5px FontName';
  ctx.fillStyle = "#A9F5D0";
  ctx.fillText(">"+message.author.tag+"<", 20, 30);

  ctx.font = '11.5px FontName';
	ctx.fillStyle = "#F2F2F2";
	ctx.fillText("[LVL SYSTEM] [MySQL: "+message.client.ws.ping+ " ms]", 20, 75);

  ctx.font = '18.5px FontName';
  ctx.fillStyle = "#E3CEF6";
  ctx.fillText("Your LVL:", 20, 110);

  ctx.font = '18.5px FontName';
  ctx.fillStyle = "#A9F5D0";
  ctx.fillText(`[ ${(rows[0].lvl==null)?1:rows[0].lvl}`, 120, 110);

  ctx.font = '18.5px FontName';
  ctx.fillStyle = "#E3CEF6";
  ctx.fillText("Your XP:", 20, 140);

  ctx.font = '18.5px FontName';
  ctx.fillStyle = "#A9F5D0";
  ctx.fillText("[ "+rows[0].xp+" ]", 120, 140);




	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'lvl.png');

  message.channel.send(attachment).then(
    m => m.react('✅'))
})}
