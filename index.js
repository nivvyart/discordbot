const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, weathertoken } = require('./config.json');
const fetch = require('node-fetch');

// Add a weather component

client.once('ready', () => {
	console.log('Ready!');
});

//make this a secret before pushing
client.login(token);


// custom function testing:

function factorial(n){
  // This function returns the factorial of a given number.
  // return (n <= 1) ? 1 : n * factorial(n-1);
  if (n === 0){
    return 1
  } else {
    return factorial(n - 1) * n
  }
}

// Bot from here //////////////////////////////////////////////////////////////

// message listening (on)
client.on("message", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return; //If the message either doesn't start with the prefix or was sent by a bot, exit early.

  const args = message.content.slice(prefix.length).split(/ +/); //Create an args variable that slices off the prefix entirely and then splits it into an array by spaces.
  const command = args.shift().toLowerCase(); //Create a command variable by calling args.shift(), which will take the first element in array and return it while also removing it from the original array (so that you don't have the command name string inside the args array).

  if (message.content === `${prefix}ping`) {
  	message.channel.send('Pong.');
  } else if (message.content.startsWith(`${prefix}beep`)) {
  	message.channel.send('Boop.');

// Server and User info ////////////////////////////////////////////////////////
  } else if (message.content === `${prefix}server-info`) {
    message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nRegion: ${message.guild.region}`)
  } else if (message.content === `${prefix}user-info`) {
    message.channel.send(`Your Username: ${message.author.username}\nYour ID: ${message.author.id}`)

// Arguments ///////////////////////////////////////////////////////////////////
  } else if (command === 'args-info') {
    if(!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`)
    }
    else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }
    message.channel.send(`First argument:  ${args[0]}`);
  } else if (command === 'kick') {
    if (!message.mentions.users.size) {
      return message.reply('You need to tag a user correcly in order to kick them!')
    }
    const taggedUser = message.mentions.users.first();

    message.channel.send(`You wanted to kick: ${taggedUser.username}`)
  } else if (command === 'avatar') {
    if (!message.mentions.users.size) {
      return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`)
    }

    const avatarList = message.mentions.users.map(user => {
      return `${user.username}'s avatar: <${user.displayAvatarURL}>'`
    });
    message.channel.send(avatarList)
  }

  // my commands from here
  //factorial calcualtor
  else if (command === 'factorial') {
    const amount = parseInt(args[0]);
    if (isNaN(amount)) {
      return message.reply('that doesnt seem to be a valid number')
    }
    if (amount > 15) {
      return message.reply('No recursive functions above 15 please')
    }
    return message.channel.send(`${args[0]} factorial is: ${factorial(args[0])}`)
  }

});

client.on("message", async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

  if (command === 'cat') {
	  fetch('https://aws.random.cat/meow').then(res => res.json()).then(json => message.channel.send(json.file));

  }
  else if (command === 'weather') {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${args[0]}&units=metric&APPID=${weathertoken}`).then(res => res.json()).then(json => message.reply(`\n${args[0]}: ${json.main.temp}°, ${json.weather[0].description}\n High/Low: ${json.main.temp_max}°C / ${json.main.temp_min}°C,  Humidity:${json.main.humidity}%\n Sunrise: ${new Date (json.sys.sunrise *1000)}\n Sunset : ${new Date (json.sys.sunset *1000)}`));
  }
});
