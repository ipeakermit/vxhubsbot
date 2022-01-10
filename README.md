# VX Labs Mozilla Hubs Bot

## Demos

Currently this bot is set up to run 2 demos specified below when started.

1. Proximity doors: the bot will spawn 2 doors and open them automatically when any player gets close to the doors.
2. Image sequence: the bot will spawn a screen with a sequence of images that will cycle every 2 seconds.

Note that currently, if a player grabs any of the objects controlled by the bot, they will stop working until the bot is restarted. This is most likely an issue that can be fixed with more research.

## Running the bot

1. Clone this repository onto your local machine.
2. Create a file called `config.json` based off `config.example.json` and fill out the details.
3. Run `yarn` to install the dependencies. (you can also use `npm i` if you don't have yarn installed)
4. Run `yarn start` or `npm run start` to start the bot. It should output it's progress and any errors in the console.