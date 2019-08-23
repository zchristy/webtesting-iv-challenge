const express = require('express');

const teams = require('../models/models.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the backend!' });
});

server.get('/api/teams', (req, res) => {
  teams.find()
    .then(teams => {
      res.status(200).json(teams);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get('/api/teams/:id', (req, res) => {
  const { id } = req.params

  teams.findById(id)
    .then(team => {
      res.status(200).json(team);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/api/teams', (req, res) => {

  teams.add(req.body)
    .then(team => {
      res.status(200).json(team);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.put('/api/teams/:id', (req, res) => {
  const { id } = req.params

  teams.update(id, req.body)
    .then(team => {
      res.status(200).json(team);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete('/api/teams/:id', (req, res) => {
  const { id } = req.params

  teams.remove(id)
    .then(id => {
      res.status(200).json({message: "Your team has been deleted"});
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = server;
