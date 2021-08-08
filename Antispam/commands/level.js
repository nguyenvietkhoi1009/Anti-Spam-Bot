const LEVEL = require("../db/xp/embed")
module.exports = {
    name:"level",
    description:"Information about your level",
    args: false,
    usage: "xxlevel",
    guildOnly: false,
    cooldown: 10,
    execute(message){

        LEVEL.card_(message).then(
            m => m.react('✅'))

    }
}
