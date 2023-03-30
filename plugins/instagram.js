const { command, getJson,isPrivate } = require("../lib/");

command(
  {
    pattern: "insta ?(.*)",
    fromMe: isPrivate,
    desc: "downloads video from instagram",
    type: "downloader",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("_Enter link_");
    if (!match.includes("instagram.com"))
      return await message.reply("_Invalid URL_");
    let response = await getJson(
      `https://x-asena-api.up.railway.app/ig?q=${match}`
    );
    message.sendFromUrl(response.result[0].url);
  }
);
