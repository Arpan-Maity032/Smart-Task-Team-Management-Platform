const express = require('express');
const router = express.Router();

const {
    createProject,
    getProjects,
    addMemberToProject
} = require('../Controller/projectController');


const {protect} = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(getProjects)
    .post(createProject);

router.route('/:id/members')
    .post(addMemberToProject);


module.exports = router;