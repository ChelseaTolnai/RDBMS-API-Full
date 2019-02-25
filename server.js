const express = require('express');
const helmet = require('helmet');

const cohertsRouter = require('./api/Coherts/cohertsRouter');
const studentsRouter = require('./api/Students/studentsRouter')

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/coherts', cohertsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;
