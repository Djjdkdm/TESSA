const { command,
 isPublic,
 tiny,
 styletext } = require("../lib/");
const { WORK_TYPE,
     BOT_NAME } = require("../config.js");

command({
	pattern: 'intro ?(.*)',
	fromMe: isPublic,
	type: 'misc',
}, async (message, match) => {


let intro = `
╭━━〘 MY INTRO 〙━━──⊷`
intro+= `
┃ ❐ ╭────────────── 
┃ ❐ │ *BOTNAME : AMAROK*
┃ ❐ │ *OWNER : CYBERXKID*
┃ ❐ │ *COUNTRY : SOUTH AFRICA*
┃ ❐ │ *PLACE : MADADENI*
┃ ❐ │ *GENDER : MALE*
┃ ❐ │ *AGE : 17*
┃ ❐ │ *NUMBER : MOBILE*
┃ ❐ │ *SIMCARD : MTN*
┃ ❐ │ *REGION : ANIMAL*
┃ ❐ │ *ANIMAL : WOLF*
┃ ❐ │ *ATTITUDE : BAD WOLF*
┃ ❐ │ *IG ID : TOXIC CYBER*
┃ ❐ │ *ACCESS : ${WORK_TYPE}*
┃ ❐ ╰────────────
╰━━━━━━━━━━━──⊷`;

const buttons = [
  {buttonId: 'id1', buttonText: {displayText: 'I LOVE YOU'}, type: 1},
]

const buttonMessage = {
    image: {url: 'https://i.ibb.co/N2rw4k6/2a8b22d25410.jpg'},
    caption: tiny(intro),
    footer: tiny(`${BOT_NAME}`),
    buttons: buttons,
    headerType: 1
}

await message.client.sendMessage(message.jid, buttonMessage)

})
