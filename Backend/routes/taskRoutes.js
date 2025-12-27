const express = require('express');
const router = express.Router();

const {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask
} = require('../Controller/taskController');

const {protect} = require('../middleware/authMiddleware');

router.use(protect); //all task router are protected

router.route('/')
    .get(getTasks) //fetch all tasks for a project
    .post(createTask); //create a new task

router.route('/:id')
    .put(updateTaskStatus) //move task between column
    .delete(deleteTask); //Remove task

module.exports = router;