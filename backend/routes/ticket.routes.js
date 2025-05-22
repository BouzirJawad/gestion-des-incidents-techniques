const express = require("express");

const { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket  } = require('../controllers/ticket.controller');

const router = express.Router();

router.post('/', createTicket);
router.get('/', getAllTickets);
router.get('/' , getTicketById );
router.put('/' , updateTicket)
router.delete('/' , deleteTicket)

module.exports = router;
