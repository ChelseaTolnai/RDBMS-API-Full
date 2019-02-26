const express = require('express');
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

const cohortsRouter = express.Router();

cohortsRouter.post('/', async (req, res) => {
    try {
        const cohort = req.body;
        if (cohort.name) {
          const [id] = await db('cohorts').insert(cohort);
          res.status(201).json(id)
        } else {
          res.status(400).json({error: "Cohort name is required."})
        }
    } catch (error) {
        res.status(500).json({error: "Error adding cohort."})
    }
});

module.exports = cohortsRouter;