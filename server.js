const express = require('express');
const helmet = require('helmet');

const cohortsRouter = require('./api/Cohorts/cohortsRouter');
const studentsRouter = require('./api/Students/studentsRouter')

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/coherts', cohortsRouter);
server.use('/api/students', studentsRouter);

module.exports = server;
