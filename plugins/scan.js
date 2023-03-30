const { command, isPublic, sleep, isUrl, Bitly, tiny  } = require("../lib")

command(
  {
         pattern: "scan",
         fromMe: isPublic,
         type: "mics",
  },
  async(message,match) => {
 await message.sendFromUrl("https://amarok-baileyz.herokuapp.com/");

 await message.client.sendMessage(message.jid, {
          caption: "Scan amarok qr within 8min",
          footer: "Amarok Public",
          buttons: [{
            buttonld: ".scan",
            buttonText: {
                 displayText: tiny("Generate new")
            },
             type: 1
            }]
          });
        await sleep (19* 1000);
  await message.reply("Your session has expired");
 }
);
