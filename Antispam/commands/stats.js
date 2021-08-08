const STATS_ = require("../tempcommands/stats");

module.exports = {
    name:"stats",
    description:"Information about the argument",
    usage: "<argument1>",
    guildOnly: true,
    cooldown: 2,
    execute(message,client,args){
        if(message.channel.type==="dm")return;
        STATS_.stats_(message, client)
    }
}