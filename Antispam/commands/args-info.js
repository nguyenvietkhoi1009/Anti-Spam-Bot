module.exports = {
    name:"args-info",
    description:"Information about the argument",
    args: true,
    usage: "<argument1>",
    guildOnly: false,
    cooldown: 2,
    execute(message,args){
        
        if(args[0]=="first"){
            return message.channel.send("1.Argument").then(
                m => m.react('✅'))
        }
        
        message.channel.send("Arguments: "+args+"\n"+"Args length"+args.length).then(
            m => m.react('✅'))
    }
}