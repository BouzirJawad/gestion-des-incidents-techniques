const express = require("express");

const { createTicket, getAllTickets, getTicketById, updateTicket  } = require('../controllers/ticket.controller');

const router = express.Router();

router.post('/', createTicket);
router.get('/', getAllTickets);
router.get('/' , getTicketById );
router.put('/' , updateTicket)

module.exports = router;
