const Ticket = require('../models/Ticket');
const User = require('../models/User');


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



// oubtonie toutes les tickite 

exports.getAllTickets = async(req , res)=>{

try {
  const filter = req.user.role === "admin" ? {} : {user : req.user.id}

  const tickets = await Ticket.find(filter)
  .populate("user" , "username email")
  .populate("assignedTo" , "username email")
  .sort({createdAt : -1})


  res.status(200).json(tickets);
}catch (error){
  res.status(500).json({msg : "error lors la requperation des tickets "})
}

}


//oubtonire un ticket par ID 

exports.getById = async(req , res)=>{
  try{
    const ticket =  await Ticket. findById(req.params.id)
    .populate("user" , "username")
    .populate("assignedTo" , "username email")


    if(!ticket) {
      return res.status(404).json({ message: "Ticket non trouvé" });
    } 

    
    if (req.user.role !== "admin" && ticket.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }
    res.status(200).json(ticket);

  }catch(error){
    res.status(500).json({ message: "Erreur serveur" });
  }
}