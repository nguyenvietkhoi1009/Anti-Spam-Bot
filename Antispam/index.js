  //fs
const fs = require("fs");
require("dotenv").config();

//config
const {prefix} = require("./config.json")



const mysql = require('mysql');
const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port:process.env.PORT,
    database:process.env.DATABASE
});



//discord.js
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();
const { MessageEmbed } = require("discord.js");


//SPAM
let db2 = JSON.parse(fs.readFileSync("./antispam/slowspam.json", "utf8"));
const SLOWSPAM = require('./antispam/slowspam.js')
const FASTSPAM = require('./antispam/fastspam.js')
const BLACKLIST = require('./antispam/blacklist.js')

///STATS
const STATS_ = require("./tempcommands/stats")

//mention
module.exports.mention_2 = function mention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/^<@!?(\d+)>$/);
	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;
	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}
module.exports.mention = function mention(mention){
    if(!mention)return;


    if(mention.startsWith("<@") && mention.endsWith(">")){
        mention = mention.slice(2,-1)
        console.log(mention + " 1")
        if(mention.startsWith("!")){
            mention = mention.slice(1);
            console.log(mention+" 2")

        }

        return client.users.cache.get(mention)

        }


    }
module.exports.mention_id = function mention(id){
    return client.users.cache.get(id)
}



//command handler
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name,command);

}
//cooldowns
const cooldowns = new Discord.Collection();

client.on('ready', () => {
    console.log(201);


    //CREATE_DB.createDB("ANTISPAM",con);
    //CREATE_DB.createDB("DiscordAntiSpam",con)}catch(err){console.log(400)
    //CREATE_TABLE.createTableGUild("GuildsCreated",con)
    //SELECT.select_first("JoinedGuilds",con)
    //CREATE_TABLE.createTableGUild("JoinedGuilds",con)
    //SELECT.select_fields("JoinedGuilds",con);
    //DELETE_WHERE.delete_where("JoinedGuilds",con,"GuildName","ANTI SPAM")

    console.log(200)
});

//db functions
let INSERT = require("./db/insertdb");
let SELECT = require("./db/select/select"); ///2 functions
let WHERE  = require("./db/select/where"); ///4 functions
let CREATE_TABLE = require("./db/createtable")
let CREATE_DB = require("./db/createdb")
let DELETE_WHERE = require("./db/delete/delete")
let DROP = require("./db/delete/drop")
let UPDATE = require("./db/update/update");
let XP = require("./db/xp/xp");
let LVL = require("./db/xp/lvl");
let CARD = require("./db/xp/embed")

const { fastspam_ } = require("./antispam/fastspam");


//CreateEvent
client.on('guildCreate', guild => {
    console.log(guild.id)
    INSERT.insertGuild("JoinedGuilds",guild,con)

});

client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
    }


	if(reaction.count==2&&reaction.message.reactions.cache.find(m => m.emoji.name=="✅"&&m.message.author.id=="681875101020454930")){
        console.log("-------")
        reaction.message.reactions.cache.find(m => console.log(m.emoji.name))
        console.log("-------")
        reaction.message.delete({timeout:1000})
    }

});

///

client.on('message', message => {
    if(message.content.startsWith("xx")){
        try{message.delete({timeout:2000,reason:"commands"})}catch(err){console.log(402)}
    }


    ///SPAM
    try{SLOWSPAM.slowspam_(message,db2,MessageEmbed)}catch(err){console.log(311)}
    try{FASTSPAM.fastspam_(message)}catch(err){console.log(322)}
    try{BLACKLIST.black_list_(message)}catch(err){console.log(333)}


    if(message.content=="xxtest"){
      CARD.card_(message,con);
    }
    if(message.author.bot)return;
    ///STATS


    if(!message.content.startsWith(prefix) || message.author.bot) return;

    //args and command
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();


    if(!client.commands.has(commandName))return;


    const command = client.commands.get(commandName);

    ////dm
    if(command.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }


    if(command.args && !args.length){
        let reply ="You didnt provide any arguments, "+ message.author.tag
        if(command.usage){
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply)
    }


    ///start cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {

    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    //end cooldown

    try{
        command.execute(message,args);

    }catch(err1){
        console.log(err1)
    }



});

client.login(process.env.TOKEN);
