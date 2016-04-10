# Señor Motiv8r

Motivate yourself to work on personal projects by using a structured Trello board and receive motivation to work thru tasks on that board via Señor Motiv8r.

### v0.1.0

Get motivation by receiving a scheduled push notification (sent with ITFFF via Maker channel) with a random project and task you could work on if you feel like.

For example get a notification every Sunday at 10:00 suggesting a possible task to progress your personal projects.

Requires a Trello board specified by ID with a structure: One main list called `Projects` with cards for each project, then lists with the name matching the card in `Projects` with cards for tasks for that project. For example a project card called `Make chair` with a list called `Make chair` and cards in that list for sketching, drawing plans, buying materials, construction, painting, etc.

Perhaps this board and main list can be specified via Trello IDs later in this project and optionally set as configuration

### How to run

- setup the ITFFF Maker channel and create a recipe and get the webhook url
- clone the repo and set values for the `.env.example` file and rename to `.env`
- `npm install`
- `node senor-motiv8r.js` (or use PM2 or similar to run the node app)

### TODO

- test @ v0.1.0

#### The future

I'm waiting for the Facebook Messenger chat SDK to be released and then this will likely become a chatbot that can edit the Trello board and suggest projects to work on in an interactive way.