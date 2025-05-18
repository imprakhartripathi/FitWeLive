import { Request, Response } from "express";
import TicketModel, { ITicket } from "../mongodb/schematics/tickets";
import AdminModel from "../mongodb/schematics/admin";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Create ticket
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { generatedBy, generatorEmail, generatorPhone, description, adminEmail } = req.body;

    if (!generatedBy || !generatorEmail || !generatorPhone || !description) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const newTicket = new TicketModel({
      generatedBy,
      generatorEmail,
      generatorPhone,
      description,
      isResolved: false,
    });

    await newTicket.save();

    if (adminEmail) {
      const admin = await AdminModel.findOne({ email: adminEmail });
      if (admin) {
        admin.tickets.push(newTicket);
        await admin.save();
      }
    }

    res.status(201).json(newTicket);
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};

// Show all tickets
export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets: ITicket[] = await TicketModel.find();
    res.json(tickets);
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};

// Get ticket by ID or email
export const getTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, email } = req.query;

    if (id) {
      const ticket = await TicketModel.findById(id.toString());
      if (!ticket) {
        res.status(404).json({ error: "Ticket not found" });
        return;
      }
      res.json(ticket);
      return;
    }

    if (email) {
      const tickets = await TicketModel.find({ generatorEmail: email.toString() });
      if (tickets.length === 0) {
        res.status(404).json({ error: "No tickets found for this email" });
        return;
      }
      res.json(tickets);
      return;
    }

    res.status(400).json({ error: "Provide either id or email as query parameter" });
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};

// Toggle isResolved status of a ticket by ID
export const toggleTicketResolution = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Ticket ID is required" });
      return;
    }

    const ticket = await TicketModel.findById(id);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    ticket.isResolved = !ticket.isResolved;
    await ticket.save();

    // Optional: Update embedded tickets inside admins if needed
    /*
    await AdminModel.updateMany(
      { "tickets._id": ticket._id },
      { $set: { "tickets.$.isResolved": ticket.isResolved } }
    );
    */

    res.json(ticket);
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};

// Delete ticket by ID
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Ticket ID is required" });
      return;
    }

    const deletedTicket = await TicketModel.findByIdAndDelete(id);
    if (!deletedTicket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    // Optional: Remove from embedded admin tickets as well
    /*
    await AdminModel.updateMany(
      {},
      { $pull: { tickets: { _id: id } } }
    );
    */

    res.json({ message: "Ticket deleted", ticket: deletedTicket });
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};
