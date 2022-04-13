const emojis = require ("../../emojis");
const { MessageEmbed } = require('discord.js');
const backup = require("discord-backup");

module.exports = {
    name: "charger-backup",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send("" +emojis.fail+ " | Vous devez être administrateur de ce serveur pour charger une sauvegarde!");
        }
        let backupID = args.join(" ");
        if(!backupID){
            return message.channel.send("" +emojis.fail+ " | Vous devez spécifier un ID de sauvegarde valide!");
        }
        
        backup.fetch(backupID).then(async () => {
            message.channel.send("" +emojis.warnning_1+ " | Lorsque la sauvegarde est chargée, tous les salon, rôles, etc. seront remplacés! Réagissez avec ✅ pour confirmer!")
            .then(m => {
               m.react("✅")
        
      const filtro = (reaction, user) => {
            return ["✅"].includes(reaction.emoji.name) && user.id == message.author.id;
            };
                m.awaitReactions(filtro, {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch(() => {
                    m.edit("" +emojis.fail+ " | Le temps est écoulé! Chargement de sauvegarde annulé!");
                }).then(coleccionado => {
          
        const reaccion = coleccionado.first();
        if (reaccion.emoji.name === "✅") {
                  message.author.send("" +emojis.seccuss+ " | Votre sauvegarde c'est charger correctement!");
                  backup.load(backupID, message.guild).then(() => {
                      backup.remove(backupID);
                  }).catch((err) => {
                      return message.author.send("" +emojis.fail+ " | Désolé, une erreur s'est produite ... Veuillez vérifier que je dispose des droits d'administrateur!");
                  });
              };   
        })
      })
    });
  }
};