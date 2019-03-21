const express = require('express');
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

const studentsRouter = express.Router();

studentsRouter.post('/', async (req, res) => {
    try {
        const student = req.body;
        if (student.name && student.cohort_id) {
          const [id] = await db('students').insert(student);
          res.status(201).json(id)
        } else {
          res.status(400).json({error: "Student name and cohort ID is required."})
        }
    } catch (error) {
        res.status(500).json({error: "Error adding student."})
    }
});

studentsRouter.get('/', async (req, res) => {
    try {
        const students = await db('students');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({error: "Error getting students."})
    }
});

studentsRouter.get('/:id', async (req, res) => {
    try {
        const student = await db('students')
          .where({ id: req.params.id })
          .first();
        const cohort = await db('cohorts')
          .where( { id: student.cohort_id })
          .first();
        if (student) {
            res.status(200).json({ 
                id: student.id, 
                name: student.name, 
                cohort: cohort.name
            })
        } else {
          res.status(404).json({error: "Student with specified ID does not exist."})
        }
    } catch (error) {
        res.status(500).json({error: "Error getting specified student."})
    }
});

studentsRouter.put('/:id', async (req, res) => {
    try {
        const student = req.body;
        if (student.name && student.cohort_id) {
            const count = await db('students')
              .where({ id: req.params.id })
              .update(student);

            if (count > 0) {
                const updatedStudent = await db('students')
                  .where({ id: req.params.id })
                  .first();

                res.status(200).json(updatedStudent)
            } else {
                res.status(404).json({error: "Student with specified ID does not exist."})
            }
        } else {
        res.status(400).json({error: "Student name and cohort ID is required."})
        }
    } catch (error) {
        res.status(500).json({error: "Error updating specified student."})
    }
});

studentsRouter.delete('/:id', async (req, res) => {
    try {
        const count = await db('students')
          .where({ id: req.params.id })
          .del();

        if (count > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({error: "Student with specified ID does not exist."})
        }
    } catch (error) {
        res.status(500).json({error: "Error deleting specified student."})
    }
});

module.exports = studentsRouter;