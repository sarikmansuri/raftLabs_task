const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { createData, getData, updateData, deleteData } = require('../controllers/data.controller');

router.post('/createData', auth, createData);
router.get('/', auth, getData);
router.put('/:id', auth,updateData);
router.delete('/:id', auth, deleteData);

module.exports = router;
