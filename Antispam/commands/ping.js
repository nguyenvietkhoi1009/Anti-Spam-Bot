const Discord = require('discord.js');
const client = new Discord.Client();
const PING = require("../index")

module.exports =  {
    name:"ping",
    cooldown:5,
    description:"Simple ping command",
    args:false,
    guildOnly: false,
    execute(message,args){


        message.channel.send("`||PING||`").then(m =>{
            let ping = m.createdTimestamp - message.createdTimestamp;
          
            setTimeout(() => {
              m.edit(`**🗿The Ping Is: **\n  ${ping}ms`);
               
           
            }, 1000);
            setTimeout(() => {
              m.edit(`**🗿The <3 of Bot Is: **\n  ${message.client.ws.ping}ms`);
               
             
            }, 4000);
            setTimeout(() => {
                m.react('✅')
                
              }, 4000);
        
    })
}}
    

