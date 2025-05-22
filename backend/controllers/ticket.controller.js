const Ticket = require("../models/Ticket");
const User = require("../models/User");

exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      user: req.user.id,
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du ticket", error: err.message });
  }
};


exports.getAllTickets = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user.id };

    const tickets = await Ticket.find(filter)
      .populate("user", "username email")
      .populate("assignedTo", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des tickets" });
  }
};


exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("user", "username email")
      .populate("assignedTo", "username email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket non trouvé" });
    }

    if (req.user.role !== "admin" && ticket.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};


exports.updateTicket = async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket non trouvé" });

    const isOwner = ticket.user.toString() === req.user.id;
    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (priority) ticket.priority = priority;
    if (status && req.user.role === "admin") ticket.status = status;
    if (assignedTo && req.user.role === "admin") ticket.assignedTo = assignedTo;

    ticket.updates.push({
      message: `Ticket modifié par ${req.user.username}`,
      updatedBy: req.user.id,
    });

    await ticket.save();
    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket introuvable" });

    if (req.user.role !== "admin" && ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Suppression non autorisée" });
    }

    await ticket.deleteOne();
    res.status(200).json({ message: "Ticket supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
