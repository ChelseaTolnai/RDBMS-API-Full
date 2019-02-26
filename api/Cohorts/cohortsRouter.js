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

cohortsRouter.get('/', async (req, res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    } catch (error) {
        res.status(500).json({error: "Error getting cohorts."})
    }
});

cohortsRouter.get('/:id', async (req, res) => {
    try {
        const cohort = await db('cohorts')
          .where({ id: req.params.id })
          .first();
        if (cohort) {
          res.status(200).json(cohort)
        } else {
          res.status(404).json({error: "Cohort with specified ID does not exist."})
        }
    } catch (error) {
        res.status(500).json({error: "Error getting specified cohort."})
    }
});

cohortsRouter.put('/:id', async (req, res) => {
    try {
        const cohort = req.body;
        if (cohort.name) {
            const count = await db('cohorts')
              .where({ id: req.params.id })
              .update(cohort);

            if (count > 0) {
                const updatedCohort = await db('cohorts')
                  .where({ id: req.params.id })
                  .first();

                res.status(200).json(updatedCohort)
            } else {
                res.status(404).json({error: "Cohort with specified ID does not exist."})
            }
        } else {
        res.status(400).json({error: "Cohort name is required."})
        }
    } catch (error) {
        res.status(500).json({error: "Error updating specified cohort."})
    }
});

cohortsRouter.delete('/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
          .where({ id: req.params.id })
          .del();

        if (count > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({error: "Cohort with specified ID does not exist."})
        }
    } catch (error) {
        res.status(500).json({error: "Error deleting specified cohort."})
    }
});

module.exports = cohortsRouter;