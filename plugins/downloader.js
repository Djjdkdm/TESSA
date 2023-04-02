const {  command,  qrcode,  webp2mp4,  isUrl,  isPrivate,  getBuffer,  fetchJson,  proto,  tiny,  getJson,  getUrl,  isIgUrl, fetchBuffer,  generateWAMessageFromContent,  findMusic } = require("../lib/");
const { WORK_TYPE, BOT_NAME, OWNER_NAME, HANDLERS } = require('../config.js')
const  { igstory, igdl }  = require("../lib/scrape");
const { yta, ytIdRegex, ytv } = require("../lib/yotube");
const { ytMp4, ytMp3, ytPlay } = require("../lib/ytdl")
const { y2mateA, y2mateV } = require("../lib/y2mate")
const  yts  = require("yt-search");
const logo = "https://i.imgur.com/lNlyOEY.jpeg"
const ytdl = require('ytdl-secktor')
const { toAudio } = require("../lib/media");
let gis = require("g-i-s");
const { AddMp3Meta } = require("../lib");
const { insta } = require('../lib/')
var videotime = 60000 // 1000 min
var dlsize = 1000 // 1000mb
const jimp = require("jimp");
const QRReader = require("qrcode-reader");
const { RMBG_KEY } = require("../config");
let { unlink } = require("fs/promises");
const got = require("got");
const FormData = require("form-data");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);
const fs = require("fs");
const getRandom = (text) => {
    return `${Math.floor(Math.random() * 10000)}${text}`
}
const mYtId = (query) => {
const ytIdRegex =
	/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
let yturlm = query.match(ytIdRegex)
  return yturlm
}



command({ 
    pattern : "tts" ,
    desc : "Text to speech",
    type : "media",
   },
async (message , match ) => {

if (!match) message.reply("tts Hello")
              let tts = await getBuffer(`https://api.botcahx.biz.id/api/soundoftext?text=${match}&lang=id-ID&apikey=Admin`) 
             message.client.sendMessage(message.jid, {audio: { url: tts.result }, mimetype:'audio/mpeg', ptt:false , contextInfo:{"externalAdReply": {"title": `WʜᴀᴛꜱKʀɪᴢ AI`,"body": ` ᴅᴏɴᴛ ꜱᴩᴀᴍ`, "previewType": "PHOTO","thumbnailUrl": `https://github.com/TOXIC-KICHUX/WHATS-KRIZ-AI`,"thumbnail": logo,"sourceUrl": "https://github.com/TOXIC-KICHUX/WHATS-KRIZ-AI"}}}, { quoted: message})
})

command(
  {
    pattern: "song",
    fromMe: isPrivate,
    desc: "Downloads Song",
    type: "downloader",
  },
  async (message, match) => {      
})

    command(
  {
    pattern: "ytmp3",
    fromMe: isPrivate,
    desc: "Downloads Song",
    type: "downloader",
  },
  async (message, match) => {
const krizaudp3 = require("../lib/ytdl2")
if (match.length < 1 || !isUrl(match) || !krizaudp3.isYTUrl(match)) return await message.reply("_ytmp3 yt url_")
const audio=await krizaudp3.mp3(match)
await message.client.sendMessage(message.jid,{
    audio: fs.readFileSync(audio.path),
    mimetype: 'audio/mp4', ptt: false,
    contextInfo:{
        externalAdReply:{
            title:audio.meta.title,
            body: BOT_NAME,
            thumbnail: await getBuffer(audio.meta.image),
            mediaType:2,
            mediaUrl:match,
        }

    },
},{quoted:message})
await fs.unlinkSync(audio.path)
});
      
command(
  {
    pattern: "ytmp4",
    fromMe: isPrivate,
    desc: "Downloading videos in 480p",
    type: "downloader",
  },
  async (message, match) => {
  if(!match) return await message.reply("_ytv starboy_")
const krizmp4 = require("../lib/ytdl2")
let ytsmp4 = require("youtube-yts")
        let krizsearch13 = await ytsmp4(match)
        let anuvidoke4 = krizsearch13.videos[0]
const pl2= await krizmp4.mp4(anuvidoke4.url)
await message.client.sendMessage(message.jid,{
    document: {url:pl2.videoUrl},
    fileName: anuvidoke4.title + '.mp4',
    mimetype: 'video/mp4',
    contextInfo:{
        externalAdReply:{
            title:anuvidoke4.title,
            body: BOT_NAME,
            thumbnail: await getBuffer(anuvidoke4.thumbnail),
            mediaType:2,
            mediaUrl:anuvidoke4.url,
        }
    },
},{quoted:message});
})

command(
  {
    pattern: "video ?(.*)",
    fromMe: isPrivate,
    desc: "Downloads video",
    type: "downloader",
  },
async(message, match) => {               
              if (!match) return await message.reply("_video super man_")
            let ytsvideo = require("youtube-yts")
            let videosearch = await ytsvideo(match)
            listSerch = []
            teskd = `\nSearched Video: ${match}\n`
            for (let i of videosearch.all) {
                listSerch.push({
                    title: i.title,
                    rowId: `ytmp4 ${i.url}`,
                    description: `Duration: ${i.timestamp}`
                })
            }
            let sections = [
                {
                    title: "Top " + videosearch.all.length + " videos thats matches search result",
                    rows: listSerch
                }
            ]
            const listMessage = {
                text: teskd,
                footer: BOT_NAME,
                title: ``,
                buttonText: "Videos",
                mentions: parseMention(teskd), sections
            }
            return message.client.sendMessage(message.jid, listMessage, {
                quoted: message
            })
        }
    )

command(
  {
    pattern: "fetch",
    fromMe: isPrivate,
    desc: "Downloads from a direct link",
    type: "downloader",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match)
      return message.reply(
        "_Send a direct media link_\n_*link;caption(optional)*_"
      );
    try {
      let url = match.split(";")[0];
      let options = {};
      options.caption = match.split(";")[1];

      if (isUrl(url)) {
        message.sendFromUrl(url, options);
      } else {
        message.reply("_Not a URL_");
      }
    } catch (e) {
      console.log(e);
      message.reply("_No content found_");
    }
  }
);
//message.reply_message.text
//match = match || message.reply_message.text;

    command(
  {
    pattern: "insta ?(.*)",
    fromMe: isPrivate,
    desc: "downloads video from instagram",
    type: "downloader",
  },
  async (message, match) => {
   match = match || message.reply_message.text;
    if (!match) return await message.sendMessage("ᴇɴᴛᴇʀ ʟɪɴᴋ");
    
    if (!match.includes("https://www.instagram.com"))
      return await message.reply("_Invalid URL_");
       message.reply("*Downloading...*");
    let response = await getJson(
      `https://api-viper-x0.vercel.app/api/insta?url=${match}`
    );
    try { message.sendFromUrl(response.media.url); } catch { message.sendMessage("_Error!!_"); }
  }
);

command(
  {
    pattern: "yts",
    fromMe: isPrivate,
    desc: "Search Youtube",
    type: "Search",
  },
  async (message, match) => {
    if (!match) return await message.reply("_Enter a search term_");
    let rows = [];
    search(match).then(async ({ videos }) => {
      videos.forEach((result) => {
        rows.push({
          title: result.title,
          description: `\nDuration : ${result.duration.toString()}\nAuthor : ${
            result.author
          }\nPublished : ${result.ago}\nDescription : ${
            result.description
          }\nURL : ${result.url}`,
          rowId: `yta`,
        });
      });
      await message.client.sendMessage(message.jid, {
        text: "Youtube Search for " + match,
        buttonText: "View Results",
        sections: [
          {
            title: "Youtube Search",
            rows: rows,
          },
        ],
      });
    });
  }
);

    command(
  {
    pattern: "play",
    fromMe: isPrivate,
    desc: "Downloading songs",
    type: "downloader",
  },
  async (message, match) => {
         if (!match) return await message.reply("_play starboy_")
                let yts = require("youtube-yts")
                let search = await yts(match)
                let anulay = search.videos[Math.floor(Math.random() * search.videos.length)]
                let buttons = [
                    {buttonId: `ytmp3 ${anulay.url}`, buttonText: {displayText: 'ꜱᴏɴɢ🎵'}, type: 1},
                    {buttonId: `ytmp4 ${anulay.url}`, buttonText: {displayText: 'ᴠɪᴅᴇᴏ🎥'}, type: 1}
                ]
                let buttonMessage = {
                    image: { url: anulay.thumbnail },
                    caption: `
𒈒 𝑻𝑰𝑻𝑳𝑬 : ${anulay.title}
𒈒 𝑰𝑫 : ${anulay.videoId}
𒈒 𝑫𝑼𝑹𝑨𝑻𝑰𝑶𝑵 : ${anulay.timestamp}
𒈒 𝑽𝑰𝑬𝑾𝑺 : ${anulay.views}
𒈒 𝑼𝑷𝑳𝑶𝑨𝑫 𝑨𝑻 : ${anulay.ago}
𒈒 𝑨𝑼𝑻𝑯𝑶𝑹 : ${anulay.author.name}
𒈒 𝑪𝑯𝑨𝑵𝑵𝑬𝑳 : ${anulay.author.url}
𒈒 𝑫𝑬𝑺𝑪𝑹𝑰𝑷𝑻𝑰𝑶𝑵 : ${anulay.description}
𒈒 𝑼𝑹𝑳 : ${anulay.url}`,
                    footer: BOT_NAME,
                    buttons: buttons,
                    headerType: 4
                }
                message.client.sendMessage(message.jid, buttonMessage, { quoted: message });
  })             
              
/*command(
  {
    pattern: "test",
    fromMe: isPrivate,
    desc: "Downloading videos",
    type: "downloader",
  },
  async (message, match) => {
 if (!match) return await message.reply("*_ytv starboy_*")
                let yts = require("yt-search")
                let search = await yts(match)
                let anu = search.videos[Math.floor(Math.random() * search.videos.length)]                    
  let sections = [
     {  
    title: "TᴇꜱꜱᴀMᴡᴏL",
    rows: [
       "title": "► 144p",
"description": `${anu.title}`,
"rowId": `ytmp4 ${anu.url} 144p`
},
{
"title": "► 240p",
"description": `${anu.title}`,
"rowId": `ytmp4 ${anu.url} 240p`
},
{
"title": "► 360p",
"description": `${anu.title}`,
"rowId": `ytmp4 ${anu.url} 360p`
},
{
"title": "► 480p",
"description": `${anu.title}`,
"rowId": `ytmp4 ${anu.url} 480p`
},
{
"title": "► 720p",
"description": `${anu.title}`,
"rowId": `ytmp4 ${anu.url} 720p`
},
{
"title": "► 1080p",
"description": `${anu.title}`,
"rowId": `ytmp4 ${anu.url} 1080p`
},
{
"title": "► 1440p",
"description": `${anu.title}`,
"rowId": `ytmp4 ${anu.url} 1440p`
       ]
   },
  ]
     
 const listMessage = {
    text: `ꜱᴇʟᴇᴄᴛ ᴛʜᴇ Qᴜᴀʟɪᴛʏ ꜰᴏ ᴛʜᴇ ᴠɪᴅᴇᴏ
        ʟᴇ : ${anu.title}
 ᴅᴜʀᴀᴛɪᴏɴ : ${anu.timestamp}
 ᴜᴘʟᴏᴀᴅ At : ${anu.ago}
 ᴀᴜᴛʜᴏʀ : ${anu.author.name}`,
    buttonText: "endi",
sections 
}
return await message.client.sendMessage(message.jid, listMessage, {
  quoted: message 
 });

})*/
 
command(
  {
    pattern: "ytv360",
    fromMe: isPrivate,
    desc: "Downloading videos in 360p",
    type: "downloader",
  },
  async (message, match) => {
  let { ytv } = require("../lib/y2mate")
                if (!match) return await message.reply("ytvs https://youtube.com/watch?v=PtFh6Tccag%27 360p")
                let quality = match[1] ? match[1] : '360p'
                let media = await ytv(match, quality)
                if (media.filesize >= 100000) return message.reply("File Over Limit"+util.format(media))
                message.client.sendMessage(message.jid, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `Title : ${media.title}\n File Size : ${media.filesizeF}\n Url : ${isUrl(match)}\n Ext : MP3\n Resolution : ${match[1] || '360p'}` }, { quoted: message });
                })

command(
  {
    pattern: "ytv480",
    fromMe: isPrivate,
    desc: "Downloading videos in 480p",
    type: "downloader",
  },
  async (message, match) => {
  let { ytv } = require("../lib/y2mate")
                if (!match) return await message.reply("ytvs https://youtube.com/watch?v=PtFh6Tccag%27 480p")
                let quality = match[1] ? match[1] : '480p'
                let media = await ytv(match, quality)
                if (media.filesize >= 100000) return message.reply("File Over Limit"+util.format(media))
                message.client.sendMessage(message.jid, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `Title : ${media.title}\n File Size : ${media.filesizeF}\n Url : ${isUrl(match)}\n Ext : MP3\n Resolution : ${match[1] || '480p'}` }, { quoted: message });
                })
