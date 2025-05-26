import { Request, Response } from "express";
import AdminModel, { IAdmin, ITicketSubdoc } from "../mongodb/schematics/admin";
import { Types } from "mongoose";

interface ITicket {
  _id: Types.ObjectId;
  generatedBy: string;
  generatorEmail: string;
  generatorPhone: string;
  description: string;
  isResolved: boolean;
}

function getErrorMessage(error: unknown): string { 
  if (error instanceof Error) return error.message;
  return String(error);
}

// Create ticket inside admin's tickets array
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { generatedBy, generatorEmail, generatorPhone, description } = req.body;
    const adminEmail = "fitwelive@gmail.com";  // ← hard‑coded

    if (!generatedBy || !generatorEmail || !generatorPhone || !description) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const admin = await AdminModel.findOne({ email: adminEmail });
    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    const newTicket: Partial<ITicketSubdoc> = {
      _id: new Types.ObjectId(),
      generatedBy,
      generatorEmail,
      generatorPhone,
      description,
      isResolved: false,
    };

    admin.tickets.push(newTicket as ITicketSubdoc);
    await admin.save();

    res.status(201).json(newTicket);
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};


// Get all tickets from all admins combined
export const getAllTickets = async (_req: Request, res: Response): Promise<void> => {
  try {
    const admins = await AdminModel.find({}, "tickets");
    const allTickets = admins.flatMap(admin => admin.tickets);
    res.json(allTickets);
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};

// Get ticket by ID or by generatorEmail (searching embedded tickets)
export const getTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, email } = req.query;

    if (id) {
      // Find ticket by id inside any admin's tickets array
      const admin = await AdminModel.findOne({ "tickets._id": id.toString() }, { "tickets.$": 1 });
      if (!admin || admin.tickets.length === 0) {
        res.status(404).json({ error: "Ticket not found" });
        return;
      }
      res.json(admin.tickets[0]);
      return;
    }

    if (email) {
      // Find all tickets with generatorEmail inside admins
      const admins = await AdminModel.find({ "tickets.generatorEmail": email.toString() }, { tickets: 1 });
      const tickets = admins.flatMap(admin =>
        admin.tickets.filter(ticket => ticket.generatorEmail === email.toString())
      );
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

// Toggle ticket isResolved status by ticket ID inside admin's tickets
export const toggleTicketResolution = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Ticket ID is required" });
      return;
    }

    const admin = await AdminModel.findOne({ "tickets._id": id });
    if (!admin) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    // Find subdocument by id correctly
    const ticket = admin.tickets.id(id);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    ticket.isResolved = !ticket.isResolved;
    await admin.save();

    res.json(ticket);
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};
// Delete ticket by ID from admin's tickets array
export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ error: "Ticket ID is required" });
      return;
    }

    // Find the admin owning this ticket
    const admin = await AdminModel.findOne({ "tickets._id": id });
    if (!admin) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    // Remove ticket from array by id using pull()
    admin.tickets.pull(id);
    await admin.save();

    res.json({ message: "Ticket deleted" });
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};

