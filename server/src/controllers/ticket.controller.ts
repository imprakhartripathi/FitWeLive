import { Request, Response } from "express";
import AdminModel, { IAdmin, ITicketSubdoc, TicketSubdocSchema } from "../mongodb/schematics/admin";
import mongoose, { Types } from "mongoose";
import dotenv from "dotenv";
import { sendTicketReceivedEmail, sendTicketResolvedEmail } from "./notification.controller";

dotenv.config();

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { generatedBy, generatorEmail, generatorPhone, dob, description } = req.body;

    console.log("Received body:", req.body);
    console.log("Parsed dob:", new Date(dob));

    const adminEmail = process.env.APP_MAIL as string;

    if (!generatedBy || !generatorEmail || !generatorPhone || !description || !dob) {
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
      dob: new Date(dob),
      description,
      isResolved: false,
    };

    console.log("New ticket object:", newTicket);

    // ✅ Push plain object; Mongoose will cast to subdoc
    admin.tickets.push(newTicket);

    await admin.save();

    await sendTicketReceivedEmail(generatedBy, generatorEmail);

    res.status(201).json(newTicket);
  } catch (error: unknown) {
    console.error("Error creating ticket:", error);
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
      const admin = await AdminModel.findOne({ "tickets._id": id.toString() }, { "tickets.$": 1 });
      if (!admin || admin.tickets.length === 0) {
        res.status(404).json({ error: "Ticket not found" });
        return;
      }
      res.json(admin.tickets[0]);
      return;
    }

    if (email) {
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

    const ticket = admin.tickets.id(id);
    if (!ticket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    ticket.isResolved = !ticket.isResolved;
    await admin.save();

    // Format dob as dd-mm-yyyy
    const dobString = ticket.dob instanceof Date
      ? `${ticket.dob.getDate().toString().padStart(2, '0')}-${(ticket.dob.getMonth() + 1).toString().padStart(2, '0')}-${ticket.dob.getFullYear()}`
      : "01011970"; // fallback

    await sendTicketResolvedEmail(ticket.generatorEmail, ticket.generatedBy, dobString);

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

    const admin = await AdminModel.findOne({ "tickets._id": id });
    if (!admin) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }

    admin.tickets.pull(id);
    await admin.save();

    res.json({ message: "Ticket deleted" });
  } catch (error: unknown) {
    res.status(500).json({ error: "Server error", details: getErrorMessage(error) });
  }
};
