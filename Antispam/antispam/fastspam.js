require('dotenv').config();


const usersMap = new Map();
const L = 5;
const T = 7000;
const D = 3000;



module.exports.fastspam_ = async function fastspam_(message) {
  if(usersMap.has(message.author.id)) {
    const userData = usersMap.get(message.author.id);
    const { lastMessage, timer } = userData;
    const difference = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = userData.msgCount;

    if(difference > D) {
      clearTimeout(timer);

      userData.msgCount = 1;
      userData.lastMessage = message;
      userData.timer = setTimeout(() => {
        usersMap.delete(message.author.id);

      }, TIME);
      usersMap.set(message.author.id, userData);
    }
    else {
      ++msgCount;
      if(parseInt(msgCount) === L) {
        const role = message.guild.roles.cache.find(role => role.name == "muted");
        if(role){
        message.member.roles.add(role);
        }else{
            role = await message.guild.roles.create({
                data: {
                name: "muted",
                color:"black",
                permissions: [], 
                position: message.member.roles.highest.position
                }
                
                })
                message.member.roles.add(role);
        }

        message.channel.setRateLimitPerUser(2,"spam")
        message.channel.messages.fetch({limit: 5}).then(m => 
          {
          let filtered = m.filter(msg => msg.author.id === message.author.id) 
            message.channel.bulkDelete(filtered).then(messages =>console.log(`${message.guild.name} //bulkdeleted from ${message.author.tag} => ${message.content}`)).catch(console.log("Error1"))
        })
        setTimeout(() => {
          message.member.roles.remove(role);
       
          console.log("muted")
        }, T);
        const test = async () => {

          await new Promise((resolve)=>
            setTimeout(function(){
            message.channel.setRateLimitPerUser(0,"unmute")
            }, 11000) 
            )
            }
            test();
      } else {
        userData.msgCount = msgCount;
        usersMap.set(message.author.id, userData);
      }//hi
    }
  }
  else {
    let fn = setTimeout(() => {
      usersMap.delete(message.author.id);
    }, T);
    usersMap.set(message.author.id, {
      msgCount: 1,
      lastMessage: message,
      timer: fn
    });
  }
}
