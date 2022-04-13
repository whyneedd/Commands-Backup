const fetch = require('node-fetch');
const Discord = require('discord.js');
const backup = require("discord-backup");
const emojis = require ("../../emojis");

module.exports = {
    name: "backup-create",
    aliases: ["create-backup"],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

let perms = message.member.hasPermission("ADMINISTRATOR");    
if (!perms)return message.channel.send("" +emojis.fail+ " `|` **Désolé "+`${message.author}`+", Vous ne disposez pas des autorisations «Administrateur» pour exécuter cette commande**");

    backup
      .create(message.guild, {
        jsonBeautify: true
      })
      .then(backupData => {
          const Embed = {
           author: { name: `Sauvegarde créée avec succès.` },
           description: ""+emojis.seccuss+ " Votre saugarde a été faite avec succès.\nUsage\n```\ncharger-backup " +backupData.id+ "\n```\n```\nbackup-info " +backupData.id+ "\n```",
           footer: { text: message.guild.name, icon_url: message.guild.iconURL({dynamic: true}) },
           thumbnail: { url: message.guild.iconURL({dynamic: true}) },
           timestamp: new Date(),
           color: "GREEN",           
          }
          message.channel.send({ embed: Embed });         
      });
    }
}