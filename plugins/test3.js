const {
  command,
  isPrivate,
  styletext
} = require("../config");

const { hostname, uptime } = require("os");
command(
  {
    pattern: "alive",
    fromMe: isPrivate,
    desc: "alive",
    dontAddCommandList: true,
  },
async (message,match) => {

await message.sendMessage(`hello undefined friend lm alive today is ${date}`)
}
)
