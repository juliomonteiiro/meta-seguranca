const express = require('express');
const router = express.Router();
const { createBudget } = require('../controllers/budgetController');

router.post('/create_budget', createBudget);

module.exports = router;
