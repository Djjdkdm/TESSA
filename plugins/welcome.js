const { command, isPrivate, tiny, prefix } = require("../lib");
command({ on: "text", fromMe: isPrivate }, async (message, match) => {
	let { id, owner, subject, subjectOwner, subjectTime, creation, desc, descOwner, descId, restrict, announce, size, participants, ephemeralDuration, } = await message.client.groupMetadata(message.id)
        let gParticipants = message.participants;
                        for (let num of gParticipants) {
			try { ppuser = await message.client.profilePictureUrl(num, 'image') } 
			catch { ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'}
                    	
if (message.action == 'remove') {
//if(Config.EXIT_MSG == "true" ) {
let capCtiOn = `╭───────〔 USER LEFT 〕──────╮
│
│➳ USER 〘${num.split("@")[0]}〙
│➳ LEFT/KICK FROM〘${subject}〙
│➳ TOTAL NUMBER  ┈➤ ${(participants.length + 0).toString()}
╰─────────────────────╯`
await message.reply(capCtiOn)
        }
    }
})
//Mr Amarok if you need thets as a image with bottun
//we give an example
/*
await message.client.sendMessage(message.jid,{
image: { url: ppuser },
      caption: capCtiOn,
      footer: (`amarok md`),
      buttons: [
        {
        buttonId: "cmdName",
        buttonText: {displayText: byebye🥺 },
        },
      ],
    });
*/
// a chanse to get error on this plugin becouse of
// i create first time on your bot
// an plugin, so if have any error inform to @afx-abu || @5hefin

