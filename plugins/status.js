    const { command,isPrivate } = require("../lib")
   
    command(
      {
             pattern: "status",
             fromMe: isPrivate,
             type: "misc",
             react: "💥"
      },
      async(message,match) => {
           const buttons = [{
                 buttonld: `${prefix}git`,
                 buttonText: {
                     displayText: "Github",
               },
               type: 1,
             },
               
             {
                   buttonld: `${prefix}alive`,
                   buttonText: {
                       displayText: "Alive",
              },
              type: 1,
            },
         ];

let menu = `*👥User*: ${message.pushName}\n\n*👩‍💻Description*: Amarok a whatsapp userbot powered by cybxkid.\n\n*🧭Owner*: ${OWNER_NAME}\n\n*Powered by: ${message.pushName}`;

    const buttonMessage = {
          caption: "amarok md",
          footer: "amarok",
          headerType: 4,
          contextlnfo: {
                externalAdReply: {
                title: "amarok",
                body: "amarok md",
                thumbnail: `https://i.ibb.co/6yVCHcL/38aa5206e8bc.jpg`,
                mediaType: 4,
                mediaUrl: "https://github.com/Diegoson",
                sourceUrl: "https://github.com/Diegoson",
          },
       },
    };
   return await message.client.sendMessage(message.client,jid, buttonMessage, { quoted: message,
  });
 },
);


                
          
 
   


