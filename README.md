# VX Labs Mozilla Hubs Bot

## Demos

Currently this bot is set up to run a number of demos specified below when started.

1. Proximity doors: the bot will spawn 2 doors and open them automatically when any player gets close to the doors.

2. Image sequence: the bot will spawn a screen with a sequence of images that will cycle every 2 seconds.

3. Slide deck: similar to image sequence but with 3d models loaded for each slide. Eventually the goal is to allow to user to place/save and control the slide transitions.


## Running the bot

1. Clone this repository onto your local machine.
2. Modify the file called `config.json` with the desired room url for the bot to join.
3. Run `yarn` to install the dependencies. (you can also use `npm i` if you don't have yarn installed)
4. Run `./run_demos [demo-number]` to choose a demo to launch. It should output it's progress and any errors in the console.

```
Current demos
    1. Proximity doors (Works)
    2. Rosie (?)
    3. Image sequence (?)
    4. Slide Deck (WIP)
    5. Fire Exit (?)
```


## Current issues to resolve

1. AFRAME.ANIME is deprecated as of: https://github.com/MozillaReality/aframe/commit/ced136f8f76e96ecb08ec31f966a55c78d83b7b1

2. Currently, if a player grabs any of the objects controlled by the bot, they will stop working until the bot is restarted. This is most likely an issue that can be fixed with more research.