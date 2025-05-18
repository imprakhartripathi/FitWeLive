import express from "express";
import * as ticketController from "./controllers/ticket.controller"

export const router = express.Router();

router.post("/tickets", ticketController.createTicket);
router.get("/tickets", ticketController.getAllTickets);
router.get("/ticket", ticketController.getTicket); // query params: ?id=xxx or ?email=yyy
router.patch("/ticket/:id/toggle", ticketController.toggleTicketResolution);
router.delete("/ticket/:id", ticketController.deleteTicket);