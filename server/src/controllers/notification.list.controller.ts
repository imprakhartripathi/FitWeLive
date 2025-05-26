import { Request, Response } from "express";
import NotificationUserModel, { INotificationUser } from "../mongodb/schematics/notification.list";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// Subscribe a user
export const addNotificationUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, contactNumber, description, service } = req.body;

    if (!fullName || !email || !contactNumber || !service) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const existing = await NotificationUserModel.findOne({ email, service });
    if (existing) {
      res.status(409).json({ error: "User already subscribed for this service" });
      return;
    }

    const newUser: Partial<INotificationUser> = {
      fullName,
      email,
      contactNumber,
      description,
      service,
    };

    const created = new NotificationUserModel(newUser);
    await created.save();

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

// Get all subscribed users
export const getAllNotificationUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await NotificationUserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

// Get a single subscribed user by ID
export const getNotificationUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await NotificationUserModel.findById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

// Update a subscribed user
export const updateNotificationUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent updating timestamps directly
    delete updates.createdAt;
    delete updates.updatedAt;

    const updated = await NotificationUserModel.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

// Unsubscribe (delete) a user
export const deleteNotificationUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await NotificationUserModel.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ message: "User unsubscribed successfully" });
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) });
  }
};