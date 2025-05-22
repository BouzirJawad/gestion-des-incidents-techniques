const express = require("express");

const { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket  } = require('../controllers/ticket.controller');

const router = express.Router();

router.post('/cree', createTicket);
router.get('/getall', getAllTickets);
router.get('/get' , getTicketById );
router.put('/update' , updateTicket)
router.delete('/delete' , deleteTicket)

module.exports = router;
