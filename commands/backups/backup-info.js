const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const backup = require("discord-backup");
const emojis = require ("../../emojis");
const config = require ("../../config");

module.exports = {
    name: "backup-info",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
       
let backupID = args[0];
        if(!backupID){
            return message.channel.send(""+emojis.fail+" | Vous devez spécifier un ID de sauvegarde valide!");
        }
        backup.fetch(backupID).then((backupInfos) => {
       
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${(dd[1]?dd:"0"+dd[0])}/${(mm[1]?mm:"0"+mm[0])}/${yyyy}`;
        
            let embed = new MessageEmbed()
                .setAuthor("Informations de la sauvegarde")
                .setThumbnail(backupInfos.data.iconURL)
                .addField("ID de sauvegarde", backupInfos.id, false)
                .addField("ID du serveur", backupInfos.data.guildID, false)
                .addField("Taille", `${backupInfos.size} mb`, false)
                .addField("Créé le", formatedDate, false)
                .addField("Région", backupInfos.data.region, false)
                .setFooter(config.embed.footer)
                .setTimestamp()
                .setColor("#2f3136");
            message.channel.send(embed);
        }).catch((err) => {
            return message.channel.send(":x: | Aucune sauvegarde trouvée pour `"+backupID+"`!");
        });
    }
}