# Señor Motiv8r

Motivate yourself to work on personal projects by using a structured Trello board and recieve motivation to work thru that board via Señor Motiv8r.

### v0.1.0

Get motivation by receiving a schedules push notification (sent with ITFFF via Maker channel) with a random project and task you could work on if you feel like.

For example get a notification every Sunday at 10:00 suggesting a possible task to progress your personal projects.

Requires a Trello board called `Personal Projects` that matches a structure. One main list called `Projects` with cards for each project, then lists with the name matching the card in `Projects` with cards for tasks for that project. For example a project card called `Make chair` with a list called `Make chair` and cards in that list for sketching, drawing plans, buying materials, construction, painting, etc.

Perhaps this board and main list can be specified via Trello IDs later in this project and optionally set as configuration

### How to run

- clone the repo and set values for the `.env.example` file and to rename `.env`
- `npm install`
- `node senor-motiv8r.js` (or use PM2 or similar to run the node app)

### TODO

- setup packages
- create object with init function
- init checks for DEBUG mode if not sets up a cron
- function gets the data from Trello. The active projects and chooses 1 randomly and gets a random card from its list
- function sends the POST to the webhook url