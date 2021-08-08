const mention = require('../index.js');

module.exports = {
    name:"avatar",
    aliases:["icon","pfp","bild","image","userprofil"],
    guildOnly: true,
    cooldown: 2,
    args:true,
    usage:"<@user>",
    description:"Show your avatar",
    execute(message,args,client){
        
    if(!args[0].startsWith("<@")){
        let user = mention.mention_id(args[0])
        return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`).then(
            m => m.react('✅'))
        }else{
        //mention
        if (args[0]) {
            console.log(mention)
            const user = mention.mention_2(args[0])
            if(user)
            message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`).then(
                m => m.react('✅')
            )
            else{
                console("error")
            }
        }}

}}