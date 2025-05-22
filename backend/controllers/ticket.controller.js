const Ticket = require('../models/Ticket');
const User = require('User');


// cree un ticket 
exports.createTicket = async(req , res)=>{
    try { 

        const {title , description ,priority  } = req.body;
        if(!title , !description , !priority){
          return res.status(400).json({msg :" toutes les chomps sant obligatoir"})
        }


        const newTicket = await Ticket.create({
          title,
          description,
          priority,
          user: req.User.id

        });
        res.status(201).json(newTicket);

    }catch(error){
      return res.status(500).json({msg : "error de la creation de tickete"})

    }
}