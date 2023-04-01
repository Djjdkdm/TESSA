const { command, isPrivate, tiny, serif_B, clockString, getJson } = require('../lib')
const { WORK_TYPE, BOT_NAME, OWNER_NAME, HANDLERS } = require('../config.js')
const events = require("../lib/event")
const { FancyRandom, jslbuffer } = require ("abu-bot")
const { hostname, uptime } = require("os")
const config = require("../config.js")
const prefix = config.PREFIX
const thumb = "https://telegra.ph/file/e1fa1db5368bc7eb40c95.png";

command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message, match) => {
    if (match) {
      for (let i of events.commands) {
        if (i.pattern.test(message.prefix + match))
          message.reply(
            `\`\`\`Command : ${mssage.prefix}${match.trim()}
Description : ${i.desc}\`\`\``
          );
      }
    } else {
    try {
    pp = await message.getProfilePicture(message.jid, 'image') 
    } catch {
    pp = `https://i.imgur.com/A5CwR8X.jpeg`
    }
    let logo = await jslbuffer(pp)
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
      let menu = `Tessa-Test\n`;
      let cmnd = [];
      let cmd;
      let category = [];
      events.commands.map((command, num) => {
        if (command.pattern) {
          cmd = command.pattern
            .toString()
            .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
        }

        if (!command.dontAddCommandList && cmd !== undefined) {
          let type;
          if (!command.type) {
            type = "misc";
          } else {
            type = command.type.toLowerCase();
          }

          cmnd.push({ cmd, type: type });

          if (!category.includes(type)) category.push(type);
        }
       });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
       menu += `╔════════════࿇\n║\n║◤${cmmd}◢\n║\n`
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }, num) => {
          menu += `║✠${(num += 1)} ${cmd.trim()}\n`;
        });
         menu += `╚════════════࿇\n`
         });
        menu += `Tessa-md`;
      return await message.client.sendMessage(message.jid, { text : menu }, {
      contextInfo:{
        externalAdReply:{
            title: tiny(`tessa-md`),
            body: tiny(`toxic-kichu`),
            thumbnail: logo,
            mediaType:2,
            mediaUrl: `https://www.instagram.com`,
            sourceUrl: `https://www.instagram.com`,
            showAdAttribution: true
        }

    },
},{quoted: message})
			}
})
