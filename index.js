const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

//make this a secret before pushing
client.login('NTgwMzI0NTE0NTY3Njg0MDk4.XOZzpA.UySjmVSlZeFNScCz6ZAiZFxLnqc');

// Bot from here //////////////////////////////////////////////////////////////

client.on('message', message => {
  console.log(message.content);
});
