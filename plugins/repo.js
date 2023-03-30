const { command, isPublic, tiny } = require("../lib/")
const axios = require("axios");

command(
  {      pattern: "git ?(.*)",
         fromMe: isPublic,
         type: "amarok GitHub",
  },
  async(message,match) => {


function _0x1c5f(_0x1f0f8e,_0x2b7086){const _0x1c470c=_0x1c47();return _0x1c5f=function(_0x1c5fca,_0x42096e){_0x1c5fca=_0x1c5fca-0x89;let _0x3630ca=_0x1c470c[_0x1c5fca];return _0x3630ca;},_0x1c5f(_0x1f0f8e,_0x2b7086);}const _0x4f7762=_0x1c5f;(function(_0x462b16,_0x123394){const _0x19cb66=_0x1c5f,_0x39feba=_0x462b16();while(!![]){try{const _0x5c09c2=-parseInt(_0x19cb66(0x90))/0x1*(parseInt(_0x19cb66(0x8e))/0x2)+-parseInt(_0x19cb66(0x8f))/0x3+-parseInt(_0x19cb66(0x91))/0x4+parseInt(_0x19cb66(0x8c))/0x5+parseInt(_0x19cb66(0x8b))/0x6+parseInt(_0x19cb66(0x8a))/0x7+parseInt(_0x19cb66(0x8d))/0x8;if(_0x5c09c2===_0x123394)break;else _0x39feba['push'](_0x39feba['shift']());}catch(_0xd8e4cd){_0x39feba['push'](_0x39feba['shift']());}}}(_0x1c47,0x29fe4));function _0x1c47(){const _0x15e048=['403504UwhrBJ','https://api.github.com/repos/Diegoson/AMAROK-MD','1027509VceZHp','281472YEzXeT','1526555xBLtFa','140720FcFHHn','2yDsPwb','700125xkhwpF','10345WOwkHk'];_0x1c47=function(){return _0x15e048;};return _0x1c47();}let {data}=await axios['get'](_0x4f7762(0x89));
let git = `Hi ${message.pushName}` 
git+= ` *This is Amarok MD repository*\n\n*🌟Total Stars*: ${data.stargazers_count} stars\n\n*🍽️Forks* ${data.forks_count} forks\n\n*🌲Repo*: _https://github.com/Diegoson/AMAROK-MD_\n\n*🌲Whatsapp group*: _https://chat.whatsapp.com/I3aOiLY2Ydc258VkV7p0Md_\n\n*🌲Owner*: _http://wa.me/27686881509_`,

await message.client.sendMessage(message.jid,{
image: { url: `https://i.ibb.co/dmn1drG/f51569f1668d.jpg` },
      caption: git,
      footer: tiny(`amarok md` ),
      headerType: 4,
      buttons: [
        {
        buttonId: '.owner',
        buttonText: {displayText: tiny("⫷OWNER⫸") },
        },
        {
        buttonId: '.menu',
        buttonText: {displayText: tiny("⫷MENU⫸") },
      },
    ],
    });
  }
);
        
