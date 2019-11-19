const electron = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');

const {
	app, 
	BrowserWindow,
	ipcMain
} = electron;

let mainWindow;

app.on('ready', function () {
    //create new window
    mainWindow = new BrowserWindow({
    	title: 'Keem FnF Cart System',
    	width: 800,
    	height: 510,
    	minWidth: 800,
    	minHeight: 510,
    });

    if (process.platform === "win32") {
    	mainWindow.setIcon('./notify.jpg');
    }
    //load html into window
    mainWindow.loadFile(path.join(__dirname, 'static', 'auto-opener.html'));
});


ipcMain.on('configSave', (e,config) => {

	fs.writeFile('config.json', config, err => {
		//Throwing error
		if (err) throw err;
		//File is saved
		console.log('Configuration Saved!');
	});
});

ipcMain.on('stop', () => {
	app.quit();
});



ipcMain.on('start', () => {
	mainWindow.webContents.send('message','x');
	const config = require('./config.json');
	const Discord = require('discord.js');
	const bot = new Discord.Client();
	const opn = require('opn');
	let server;
	let twitterMonitorID = config.twitterMonitorID;
	let botToken = config.botToken;
	let keyword = config.keyword;
	bot.login(botToken).catch(err => mainWindow.webContents.send('LoginError' , 'LoginError'));



	bot.on('ready', () => {
		console.log(`Logged in as ${bot.user.username}!`);
	});

	bot.on('message', message => {
		try {
			/* if (message.author.bot) return; */
            if (message.channel.type === 'dm') return; //don't respond to DMs
            if (message.channel.id === twitterMonitorID) {
				let embed = msg.embeds[0], // This is the embed we're searching in.
				field, text, number;
				if (!embed) return; // If there are no embeds in the message, return.

			for (let f of embed.fields) { // Loop through every field in the embed...
  				if (f.name == 'Link') { // ...until you find the one named 'Sizes'
    				field = f; // Then store it into the field variable
    				break; // Exit the loop

				}
			}
			if (!field) return; // If there are no 'Sizes' fields, return.


    		link = field.value;

			console.log(link);

			opn(link);
            }
        }
         catch(err){
         	console.log(err)
         }
    })
});