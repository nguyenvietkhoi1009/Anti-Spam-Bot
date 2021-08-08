const Canvas = require('canvas');
const { registerFont } = require('canvas')
registerFont("./tempcommands/fonts/OpenSans-Regular.ttf", { family: 'FontName' });
const Discord = require('discord.js');


module.exports.stats_ = async function stats_(message){


  const canvas = Canvas.createCanvas(360, 325);
  const ctx = canvas.getContext('2d');


	ctx.strokeStyle = '#FFFF00';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);


  ctx.rect(4, 4, canvas.width*0.98, canvas.height*0.97)
  ctx.fillStyle = "#373B41";
  ctx.fill()


	// Slightly smaller text placed above the member's display name
  ctx.font = '24.5px FontName';
	ctx.fillStyle = "#FFFF00";
	ctx.fillText("[ Your LvL ] ", 20, 40);

  
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'lvl.png');

  message.channel.send(attachment).then(
    m => m.react('✅'))
}
