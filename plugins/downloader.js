const { command, isPrivate} = require("../lib")
const fs = require("fs");
const yts  = require("yt-search");
const ytdl = require('ytdl-core');

/*command({ pattern: 'autodl ?(.*)', fromMe:false}), async (message, match, m, text) ={return}); */

command({ on: 'ytatdl', fromMe: isPrivate }, async (message, match) => {
	if (message.text.includes("https://youtu")) {
takes = message.text.replace('https://youtube.com/shorts/','').replace('?feature=share','').replace('https://youtube.com/watch?v=','').replace('https://youtu.be/','')   
let yts = require("yt-search")
let search = await yts(`https://youtu.be/${takes}`)
const dMp3 = async (Link ) => {
    	try{
    		await ytdl.getInfo(Link);
    		let mp3File = getRandom('.mp3') 
    		ytdl(Link, {filter: 'audioonly'})
    		.pipe(fs.createWriteStream(mp3File))
    		.on("finish", async () => {  
    			await message.sendMessage(
          fs.readFileSync(mp3File),
          { mimetype: "audio/mpeg", quoted: message },
          "audio"
        );
        fs.unlinkSync(mp3File)
        })       
        } catch (err){
//console.log(err)
}
}
var songId = await mYtId(search)
if (songId !== null){
	let Link = 'https://youtu.be/' + songId[1]
	dMp3(Link)
	} else {
		let search = await yts(search)  
		dMp3(search.all[0].url)
	}
}
});
