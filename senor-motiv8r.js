require('dotenv').config();

var Promise = require('promise');
var _ = require('lodash');
var request = require('request');

var CronJob = require('cron').CronJob;
var randomNumber = require('random-number');
var Trello = require('node-trello');

/*
if (process.env.DEBUG === 'true') {
  console.log(process.env);
}
*/

// SETUP TRELLO ACCESS

var trelloKey = process.env.TRELLO_KEY;
var trelloToken = process.env.TRELLO_TOKEN;

var trello = new Trello(trelloKey, trelloToken);

// MR MOTIVATOR

var Motiv8r = {
  mainBoard: process.env.TRELLO_BOARD_ID,
  webhook: process.env.IFTTT_WEBHOOK_URL,
  timezone: process.env.TIMEZONE,
  schedule: process.env.CRON_TIME,

  init: function() {
    var _this = this;

    if (process.env.DEBUG === 'true') {

      _this.sendMotivation();

    } else {

      var job = new CronJob({
        cronTime: _this.schedule,
        onTick: function() {

          _this.sendMotivation();

        },
        start: true,
        runOnInit: false,
        timeZone: _this.timezone
      });

    }

  },

  sendMotivation: function() {
    var _this = this;

    Promise.all([_this.getTrelloLists()]).then(function(res) {
      Promise.all([_this.getTrelloProjects()]).then(function(res) {

        _this.chooseProject();

        Promise.all([_this.getProjectTasks()]).then(function(res) {
          _this.chooseTask();
          _this.sendNotification(_this.generateMessage());
        });

      });

    });

  },

  getTrelloLists: function() {
    var _this = this;

    return new Promise(function(resolve, reject) {

      var requestUrl = '/1/boards/' + _this.mainBoard + '/lists';

      trello.get(requestUrl, function(err, res) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          _this.trelloLists = res;
          resolve(res);
        }

      });

    });
  },

  getTrelloProjects: function() {
    var _this = this;

    return new Promise(function(resolve, reject) {

      var projectsList = _this.trelloLists[_.findIndex(_this.trelloLists, {name: 'Projects'})];
      var requestUrl = '/1/lists/' + projectsList.id;

      trello.get(requestUrl, {cards: 'open'}, function(err, res) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          _this.trelloProjects = res.cards;
          resolve(res);
        }

      });

    });

  },

  chooseProject: function() {
    var _this = this;
    var getRandom = randomNumber.generator({
      min: 0,
      max: _this.trelloProjects.length - 1,
      integer: true,
    });

    _this.chosenProject = _this.trelloProjects[getRandom()];

    return _this.chosenProject;

  },

  getProjectTasks: function() {
    var _this = this;

    return new Promise(function(resolve, reject) {

      var chosenProjectCard = _this.trelloLists[_.findIndex(_this.trelloLists, {name: _this.chosenProject.name})];;
      var requestUrl = '/1/lists/' + chosenProjectCard.id;

      trello.get(requestUrl, {cards: 'open'}, function(err, res) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          _this.projectTasks = res.cards;
          resolve(res);
        }

      });

    });

  },

  chooseTask: function() {
    var _this = this;
    var getRandom = randomNumber.generator({
      min: 0,
      max: _this.projectTasks.length - 1,
      integer: true,
    });

    _this.chosenTask = _this.projectTasks[getRandom()];

    return _this.chosenTask;

  },

  generateMessage: function() {
    var _this = this;

    return 'Why not work on ' + _this.chosenProject.name + '? You could do ' + _this.chosenTask.name + ' :)';

  },

  sendNotification: function(message) {
    var _this = this;

    if (process.env.DEBUG === 'true') {
      console.log(message);
    }

    var options = {
      url: _this.webhook,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{"value1":"' + message + '"}'
    };

    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      }
    });

  },

};

Motiv8r.init();