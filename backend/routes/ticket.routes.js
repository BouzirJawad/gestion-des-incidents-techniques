const express = require("express");

const { createTicket, getAllTickets } = require('../controllers/ticket.controller');

const router = express.Router();

router.post('/', createTicket);
router.get('/', getAllTickets);

module.exports = router;
