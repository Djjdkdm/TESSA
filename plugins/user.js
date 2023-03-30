/*plugin fixed By Tshephang && Kichu 🫂🤍
Take with credit*/


const { command } = require("../lib");
const Config = require("../config");
const { SUDO } = require("../config");
const Heroku = require("heroku-client");
const heroku = new Heroku({ token: Config.HEROKU_API_KEY });
const baseURI = "/apps/" + Config.HEROKU_APP_NAME;

command(
  {
    pattern: "setpp",
    fromMe: true,
    type: "user",
  },
  async (message, match, m) => {
    if (!message.reply_message.image)
      return await message.reply("_Please Reply To A Photo_");
    let buff = await m.quoted.download();
    await message.setPP(message.user, buff);
    return await message.reply("_Profile Picture Updated_");
  }
);

command(
  {
    pattern: "setname ?(.*)",
    fromMe: true,
    type: "user",
  },
  async (message, match) => {
    if (!match) return await message.reply("_Enter name_");
    await message.updateName(match);
    return await message.reply(`_Username Updated : ${match}_`);
  }
);

command(
  {
    pattern: "block ?(.*)",
    fromMe: true,
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.block(jid);
      return await message.sendMessageMessage(`_@${jid.split("@")[0]} Blocked_`, {
        mentions: [jid],
      });
    } else {
      await message.block(message.jid);
      return await message.reply("_User blocked_");
    }
  }
);

command(
  {
    pattern: "unblock ?(.*)",
    fromMe: true,
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Reply to a person or mention_");
      await message.block(jid);
      return await message.sendMessage(`_@${jid.split("@")[0]} unblocked_`, {
        mentions: [jid],
      });
    } else {
      await message.unblock(message.jid);
      return await message.reply("_User unblocked_");
    }
  }
);

command(
  {
    pattern: "jid ?(.*)",
    fromMe: true,
    type: "user",
  },
  async (message, match) => {
    return await message.sendMessage(
      message.mention[0] || message.reply_message.jid || message.jid
    );
  }
);


command(
  {
    pattern: "delsudo ?(.*)",
    fromMe: true,
    desc: "delete sudo sudo",
    type: "user",
  },
  async (message,m, mm, match) => {
    var newSudo = (m.reply_message ? m.reply_message.jid : "" || mm).split(
      "@"
    )[0];
    if (!newSudo) return await m.sendMessage("*Need reply/mention/number*");
    var setSudo = SUDO.replace(newSudo, "").replace(/,,/g, ",");
    setSudo = setSudo.startsWith(",") ? setSudo.replace(",", "") : setSudo;
    await message.sendMessage("```NEW SUDO NUMBERS ARE: ```" + setSudo, {
      quoted: m,
    });
    await message.sendMessage("_IT TAKES 30 SECONDS TO MAKE EFFECT_", { quoted: m });
    await heroku
      .patch(baseURI + "/config-vars", { body: { SUDO: setSudo } })
      .then(async (app) => {});
  }
);

command(
  {
    pattern: "dlt ?(.*)",
    fromMe: true,
    type: "user",
  },
  async (message, match,m,client) => {
    if (message.isGroup) {
      client.sendMessage(message.jid, { delete: message.reply_message.key })
    }
  }
);
