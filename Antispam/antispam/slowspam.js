module.exports.slowspam_ = async function slowspam_(message,db2,MessageEmbed){

    if (!db2[message.author.id]) 
    db2[message.author.id] = {
      spam:[]
      };

    let userSpam = db2[message.author.id];

    

    let messages = message.content.length
    let Channel = message.channel.name
    if(Channel === "spam") {return}
    if(Channel === "counting") {return}
    else{
       userSpam.spam.push(messages)
    }

    if(userSpam.spam.length>13){
        userSpam.spam = []

      }
    
    if(userSpam.spam.length>12){
  
      if(userSpam.spam[userSpam.spam.length-1]==userSpam.spam[userSpam.spam.length-2]&&userSpam.spam[userSpam.spam.length-3]&&userSpam.spam[userSpam.spam.length-4]&&userSpam.spam[userSpam.spam.length-5]&&userSpam.spam[userSpam.spam.length-6]&&userSpam.spam[userSpam.spam.length-7]&&userSpam.spam[userSpam.spam.length-8]&&userSpam.spam[userSpam.spam.length-9]&&userSpam.spam[userSpam.spam.length-10]&&userSpam.spam[userSpam.spam.length-11]){
        
            //if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_ROLES')) return

        let author_ = message.author.username
        console.log('\x1b[31m%s\x1b[0m', message.content.toString());
        
                    message.channel.messages.fetch({limit: 20}).then(m => 
        {
        let filtered = m.filter(msg => msg.author.id === message.author.id) 
          message.channel.bulkDelete(filtered).then(messages =>console.log(`bulkdeleted from ${message.author.tag} => ${message.content}`)).catch(console.log("Error5"))
      })

      
      const CHANNEL2 = 'log';

      var logger2=message.guild.channels.cache.find(channel => channel.name === CHANNEL2)
    
      if(!logger2){
      message.guild.channels.create('log', {
      type: 'text',
      permissionOverwrites: [
      {
        id:message.guild.id,
       deny: ['VIEW_CHANNEL'],
      },
      ],
      })}


      if(logger2) {
        if(!message.guild.id=="724429790463131698")return;
      const embed2 = new MessageEmbed()
        .setTitle('Member Spammed')
        .addField('Author', message.author.tag)
        .setThumbnail(message.author.displayAvatarURL({dynamic:true}))
        .addField("Content",userSpam.spam[0])
        .addField("Created",message.author.createdAt)
        .setColor('0x00AAFF')
        .addField("Server",message.guild.name)
        .addField("Info",message.author.lastMessage)
        .addField("User ID",message.author.id)
      logger2.send(embed2)}
    
        
    userSpam.spam=[]
      
      }}

}