import express from "express";
import * as ticketController from "./controllers/ticket.controller"
import * as notificationCtrl from "./controllers/notification.list.controller"
import { deleteAdmin, getAdminById, getAllAdmins, loginAdmin, registerAdmin, updateAdmin } from "./controllers/admin.controller";

export const router = express.Router();

router.post("/tickets", ticketController.createTicket);
router.get("/tickets", ticketController.getAllTickets);
router.get("/ticket", ticketController.getTicket); // query params: ?id=xxx or ?email=yyy
router.patch("/ticket/:id/toggle", ticketController.toggleTicketResolution);
router.delete("/ticket/:id", ticketController.deleteTicket);

router.post("/notify", notificationCtrl.addNotificationUser);
router.get("/notify", notificationCtrl.getAllNotificationUsers);
router.get("/notify/:id", notificationCtrl.getNotificationUserById);
router.put("/notify/:id", notificationCtrl.updateNotificationUser);
router.delete("/notify/:id", notificationCtrl.deleteNotificationUser);

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);