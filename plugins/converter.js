const { command, qrcode, webp2mp4, isUrl, isPrivate, getJson, sleep, tiny } = require('../lib/')
const { toAudio } = require('../lib/media')
let gis = require('g-i-s')
const { AddMp3Meta } = require('../lib')
const jimp = require('jimp')
const QRReader = require('qrcode-reader')
const { RMBG_KEY } = require('../config')
let { unlink } = require('fs/promises')
const got = require('got')
const FormData = require('form-data')
const stream = require('stream')
const { promisify } = require('util')
const pipeline = promisify(stream.pipeline)
const fs = require('fs')
const config = require('../config')
const { STICKER_DATA, AUDIO_DATA } = require('../config.js')
const { Image } = require('node-webpmux')

command(
  {
    pattern: "qr ?(.*)",
    fromMe: isPrivate,
    type: "converter",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (match) {
      let buff = await qrcode(match);
      return await message.sendMessage(buff, {}, "image");
    } else if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(
        "*Example : qr test*\n*Reply to a qr image.*"
      );

    const { bitmap } = await jimp.read(
      await message.reply_message.downloadMediaMessage()
    );
    const qr = new QRReader();
    qr.callback = (err, value) =>
      message.sendMessage(err ?? value.result, { quoted: message.data });
    qr.decode(bitmap);
  }
);

command(
  {
    pattern: "img ?(.*)",
    fromMe: isPrivate,
    type: "downloader",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage("Enter Search Term,number");
    let [query, amount] = match.split(",");
    let result = await gimage(query, amount);
    await message.sendMessage(
      `_Dowloading ${amount || 5} images for ${query}_`
    );
    for (let i of result) {
      await message.sendFromUrl(i);
    }
  }
);

async function gimage(query, amount = 5) {
  let list = [];
  return new Promise((resolve, reject) => {
    gis(query, async (error, result) => {
      for (
        var i = 0;
        i < (result.length < amount ? result.length : amount);
        i++
      ) {
        list.push(result[i].url);
        resolve(list);
      }
    });
  });
}

command(
  {
    pattern: "vv ?(.*)",
    fromMe: isPrivate,
    type: "converter",
  },
  async (message, match, m) => {
    if (message.reply_message.type !== "view_once")
      return await message.reply("_Not a View Once_");
    let buff = await m.quoted.download();
    return await message.sendFile(buff);
  }
);

command(
  {
    pattern: "rmbg ?(.*)",
    fromMe: isPrivate,
    type: "converter",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.reply("_Reply to a photo_");
    if (RMBG_KEY === false)
      return await message.reply(
        `_Get a new api key from https://www.remove.bg/api_\n_set it via_\n_setvar RMBG_KEY: api key_`
      );

    await message.reply("_Removing Background_");
    var location = await message.reply_message.downloadMediaMessage();

    var form = new FormData();
    form.append("image_file", fs.createReadStream(location));
    form.append("size", "auto");

    var rbg = await got.stream.post("https://api.remove.bg/v1.0/removebg", {
      body: form,
      headers: {
        "X-Api-Key": RMBG_KEY,
      },
    });

    await pipeline(rbg, fs.createWriteStream("rbg.png"));

    await message.sendMessage(fs.readFileSync("rbg.png"), {}, { quoted : message }, "image");
    await unlink(location);
    return await unlink("rbg.png");
  }
);

command(
  {
    pattern: "photo ?(.*)",
    fromMe: isPrivate,
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(buff, {}, { quoted : message }, "image");
  }
);

command(
  {
    pattern: "mp4 ?(.*)",
    fromMe: isPrivate,
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    let buffer = await webp2mp4(buff);
    return await message.sendMessage(buffer, {}, { quoted : message }, "video");
  }
);

command(
  {
    pattern: "mp3 ?(.*)",
    fromMe: isPrivate,
    type: "converter",
  },
  async (message, match, m) => {
    //if(message.reply_message.text) return await message.reply('_Reply to a video/audio_')
    let buff = await m.quoted.download();
    buff = await toAudio(buff, "mp3");
    return await message.sendMessage(buff, { mimetype: "audio/mpeg" }, { quoted : message }, "audio");
  }
);
command(
  {
    pattern: "sticker ?(.*)",
    fromMe: isPrivate,
    type: "converter",
  },
  async (message, match, m) => {
    if (!(message.reply_message.video || message.reply_message.image))
      return await message.reply("_Reply to photo or video_");
    let buff = await m.quoted.download();
    message.sendMessage(
      buff,
      { packname: config.STICKER_DATA.split(",")[0], author: config.STICKER_DATA.split(",")[1], quoted : message },
      "sticker"
    );
});

command(
  {
    pattern: "tgs ?(.*)",
    fromMe: isPrivate,
    type: "converter",
  },
  async (message, match) => {
    if (!match)
      return message.reply(
        "_Enter a tg sticker url_\nEg: https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently"
      );
    let packid = match.split("/addstickers/")[1];
    let { result } = await getJson(
      `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(
        packid
      )}`
    );
    if (result.is_animated)
      return message.reply("_Animated stickers are not supported_");
    message.reply(
      `*Total stickers :* ${result.stickers.length}\n*Estimated complete in:* ${
        result.stickers.length * 1.5
      } seconds`.trim()
    );
    for (let sticker of result.stickers) {
      let file_path = await getJson(
        `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${sticker.file_id}`
      );
      await message.sendMessage(
        `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file_path.result.file_path}`,
        { packname: config.STICKER_DATA.split(",")[0], author: config.STICKER_DATA.split(",")[1], quoted : message },
        "sticker"
      );
      sleep(1500);
    }
  }
);

command(
  {
    pattern: "take ?(.*)",
    fromMe: isPrivate,
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message && !message.reply_message.sticker)
      return await message.reply("_Reply to sticker_");
    let buff = await m.quoted.download();
    let [packname, author] = match.split(",");
    await message.sendMessage(
      buff,
      {
        packname : packname || config.STICKER_DATA.split(",")[0], author : author || config.STICKER_DATA.split(",")[1], quoted : message
      },
      "sticker"
    );
});

command(
  {
    pattern: "getexif ?(.*)",
    fromMe: true,
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message || !message.reply_message.sticker)
      return await message.reply("_Reply to sticker_");
    let img = new Image();
    await img.load(await m.quoted.download());
    const exif = JSON.parse(img.exif.slice(22).toString());
    await message.reply(exif);
  }
);
