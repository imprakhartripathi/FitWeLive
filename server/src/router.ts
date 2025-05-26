import express from "express";
import * as ticketController from "./controllers/ticket.controller"
import { deleteAdmin, getAdminById, getAllAdmins, loginAdmin, registerAdmin, updateAdmin } from "./controllers/admin.controller";

export const router = express.Router();

router.post("/tickets", ticketController.createTicket);
router.get("/tickets", ticketController.getAllTickets);
router.get("/ticket", ticketController.getTicket); // query params: ?id=xxx or ?email=yyy
router.patch("/ticket/:id/toggle", ticketController.toggleTicketResolution);
router.delete("/ticket/:id", ticketController.deleteTicket);

// Admin Registration
router.post("/register", registerAdmin);

// Admin Login
router.post("/login", loginAdmin);

// Update admin by ID
router.put("/admin/:id", updateAdmin);

// Delete admin by ID
router.delete("/admin/:id", deleteAdmin);