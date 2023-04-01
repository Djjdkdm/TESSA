const {SUDO} = require('../config');
const { downloadMediaMessage } = require('@adiwajshing/baileys')
const fetch = require("node-fetch")
let img = 'https://i.imgur.com/1LE0IhC.jpeg'
var duration = 19998000
const endi = {
      key: {
        participant: '0@s.whatsapp.net',
        remoteJid: 'status@broadcast'
      },
      message: {
        orderMessage: {
          itemCount: 2021,
          status: 999,
          thumbnail: await (await fetch(img)).buffer(),
          surface: 999,
          message: 'Tᴇꜱꜱᴀ', orderTitle: 'ᴛᴇᴀᴍ-ᴛᴏxɪᴄ', sellerJid: '0@s.whatsapp.net'
        }
      }
    }
var audios = `https://i.imgur.com/XfVk83F.mp4, https://i.imgur.com/auLwG8M.mp4,https://i.imgur.com/c3cuNgd.mp4, https://i.imgur.com/g6IRGfZ.mp4,https://i.imgur.com/xbBkHjA.mp4,https://i.imgur.com/IUgUIfL.mp4,https://i.imgur.com/MHjfXNU.mp4,https://i.imgur.com/aaKzncG.mp4,https://i.imgur.com/S82Hacb.mp4,https://i.imgur.com/ZGF8ybR.mp4,https://i.imgur.com/x51wq1J.mp4,https://i.imgur.com/5q2gp3z.mp4,https://i.imgur.com/tUSCyaY.mp4,https://i.imgur.com/ISkWpB8.mp4`;

const {getAudioBufferFromLink,skbuffer} = require('raganork-bot')

const {readFileSync} = require('fs')

const {isPrivate, command} = require("../lib");

// command({pattern: 'mention ?(.*)', fromMe: true,dontAddCommandList: true}, (async (message, match) => {return;}));

command({on: 'text' ,fromMe: false}, (async (message, match) => {

var jids = audios.split(',').filter(link => link.includes('mp4'));

try {var men = message.mention[0].split('@')[0]} catch {return;}

if (message.mention && message.mention[0] && SUDO.includes(men)) {

var waveform = Array.from({length: 15}, () => Math.floor(Math.random() * 100)); // use this for fancy: [0,99,0,99,0,99]

getAudioBufferFromLink(jids[Math.floor(Math.random()*jids.length)],async function(audio) {

if (audio) {

return message.client.sendMessage(message.jid, {audio,mimetype: 'audio/mp4',ptt: true,waveform , contextInfo: {
            externalAdReply: {
              title: "Tᴇꜱꜱᴀ",
              body: "ᴛᴇᴀᴍ-ᴛᴏxɪᴄ",
              mediaType: 2,
              duration: 99999999,
              filesize: 999999999999,
              thumbnail: await (await fetch(img)).buffer(),
              mediaUrl: 'https://instagram.com/krishn4_d4s?igshid=MDM4ZDc5MmU=',
              sourceUrl: 'https://instagramkm/krishn4_d4s?igshid=MDM4ZDc5MmU=',
              showAdAttribution: true
            }
          }
        } { quoted: endi })}

})}

}));
