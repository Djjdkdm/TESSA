const got = require("got");
const Heroku = require("heroku-client");
const { command, isPrivate, tiny } = require("../lib/");
const Config = require("../config");
const heroku = new Heroku({ token: Config.HEROKU_API_KEY });
const baseURI = "/apps/" + Config.HEROKU_APP_NAME;
const simpleGit = require("simple-git");
const { secondsToDHMS } = require("../lib/");
const git = simpleGit();
const exec = require("child_process").exec;
const { SUDO } = require("../config");

command(
  {       pattern: "restart",
          fromMe: false,
          type: "owner"
 },
 async(message,match) => {
  const buttons = [
  {buttonId: 'amarok', buttonText: {displayText: 'RESTART'}, type: 1},
  {buttonId: 'st', buttonText: {displayText: 'SHUTDOWN'}, type: 1}
]
let buttonMessage = {
    text: `◉═════════════◉
         ᴀᴍᴀʀᴏᴋ ʀᴇsᴛᴀʀᴛ sʏsᴛᴇᴍ
 ◉═════════════◉`,
    footer: 'AMAROK SYSTEM',
    buttons: buttons,
    headerType: 1
}

return await message.client.sendMessage(message.jid, buttonMessage)
})

command(
  {
    pattern: "amarok",
    fromMe: true,
    type: "Vps",
    type: "Vps",
  },
  async (message) => {
    await message.sendMessage(`_Restarting_`);
    await heroku.delete(baseURI + "/dynos").catch(async (error) => {
      await message.sendMessage(`HEROKU : ${error.body.message}`);
    });
  }
);

command(
  {
    pattern: "st",
    fromMe: true,
    type: "Vps",
    type: "Vps",
  },
  async (message) => {
    await heroku
      .get(baseURI + "/formation")
      .then(async (formation) => {
        await message.sendMessage(`_Shutting down._`);
        await heroku.patch(baseURI + "/formation/" + formation[0].id, {
          body: {
            quantity: 0,
          },
        });
      })
      .catch(async (error) => {
        await message.sendMessage(`HEROKU : ${error.body.message}`);
      });
  }
);

command(
  {
    pattern: "delvar ",
    fromMe: true,
    type: "Vps",
    type: "Vps",
  },
  async (message, match) => {
    if (!match) return await message.sendMessage(`_Example: delvar sudo_`);
    heroku
      .get(baseURI + "/config-vars")
      .then(async (vars) => {
        const key = match.trim().toUpperCase();
        if (vars[key]) {
          await heroku.patch(baseURI + "/config-vars", {
            body: {
              [key]: null,
            },
          });
          return await message.sendMessage(`_Deleted ${key}_`);
        }
        await message.sendMessage(`_${key} not found_`);
      })
      .catch(async (error) => {
        await message.sendMessage(`HEROKU : ${error.body.message}`);
      });
  }
);
