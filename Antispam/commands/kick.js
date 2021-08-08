module.exports = {
    name:"kick",
    description:"Kick Member",
    args:true,
    usage:"<@user> <comment>",
    cooldown: 30,
    //dm yes or no? true => no dm
    guildOnly: true,
    execute(message,args){
        //mention
        const taggedUser2 = message.mentions.members.first();
        //permission
        let counter =0;
        let comments = []
        console.log(taggedUser2)

        //args for comments
        args.forEach(element =>{
            if(undefined)return
            counter = counter+1;
            comments.push(args[counter]);
            console.log(">>>>"+args[counter]+"<<<<<");
        })
            
        let reason =  {
            "kick":"`User Got Kicked by "+message.author.tag+"`",
            "name": "`Name: "+taggedUser2.user.username+"`",
            "id": "`Id:"+ taggedUser2.id+"`",
            "discrimator":"`Tag: "+taggedUser2.user.discriminator+"`",
            "comment":"`Comment: "+ comments.join(" ")+"`"
        }
        console.log(comments);

        if(!message.member.hasPermission("KICK_MEMBERS"))
        {
            message.channel.send("Not enough permissions.")
        }
        //kick function
        try{taggedUser2.kick({reason:reason.toString()})}catch(errkick){console.log(errkick)+"errKick"}
        console.log(Object.values(reason))
        message.channel.send(reason)
        message.channel.send(Object.values(reason))
}}