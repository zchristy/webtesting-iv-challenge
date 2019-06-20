const express = require('express');

const teams = require('../models/models.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/teams', (req, res) => {
  teams.find()
    .then(teams => {
      res.status(200).json(teams);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
