const STONE = require("../tempcommands/stone")
module.exports = {
    name:"stone",
    description:"📰,✂️,🥌",
    usage: "xxstone",
    guildOnly: false,
    cooldown: 10,
    execute(message,args){
        STONE.stone_(message)
    }
}