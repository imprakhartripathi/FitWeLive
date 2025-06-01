import { Request, Response } from "express";
import AdminModel, { IAdmin } from "../mongodb/schematics/admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtKey } from "../app.config";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// Register admin
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    console.log("Register Request Body:", req.body);
    const { fullName, email, password, contactNumber, sex } = req.body;

    if (!fullName || !email || !password) {
      console.log("Missing required fields");
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const existing = await AdminModel.findOne({ email });
    console.log("Existing Admin:", existing);
    if (existing) {
      res.status(409).json({ error: "Admin with this email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const newAdmin = new AdminModel({
      fullName,
      email,
      password: hashedPassword,
      contactNumber,
      sex,
    });

    await newAdmin.save();
    console.log("New Admin Saved:", newAdmin);
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Register Error:", getErrorMessage(error));
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

// Login admin
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    console.log("Login Request Body:", req.body);
    const { email, password } = req.body;

    const admin = await AdminModel.findOne({ email });
    console.log("Found Admin:", admin);
    if (!admin) {
      console.log("Invalid credentials - admin not found");
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password Match:", isMatch);
    if (!isMatch) {
      console.log("Invalid credentials - password mismatch");
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, jwtKey);

    console.log("JWT Token Generated:", token);

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        contactNumber: admin.contactNumber,
        sex: admin.sex,
        imageURL: admin.imageURL,
        notificationsOn: admin.notificationsOn,
        emailNotificationsOn: admin.emailNotificationsOn,
      },
    });
  } catch (error) {
    console.error("Login Error:", getErrorMessage(error));
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

// Get all admins
export const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await AdminModel.find().select("-password");
    console.log("All Admins Fetched:", admins.length);
    res.json(admins);
  } catch (error) {
    console.error("Get All Admins Error:", getErrorMessage(error));
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

// Get admin by ID
export const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Get Admin by ID:", id);
    const admin = await AdminModel.findById(id).select("-password");
    if (!admin) {
      console.log("Admin not found");
      res.status(404).json({ error: "Admin not found" });
      return;
    }
    console.log("Admin Found:", admin);
    res.json(admin);
  } catch (error) {
    console.error("Get Admin By ID Error:", getErrorMessage(error));
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

// Update admin
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    console.log("Update Admin ID:", id);
    console.log("Update Data:", updates);

    // Prevent password update this way
    if (updates.password) delete updates.password;

    const admin = await AdminModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    if (!admin) {
      console.log("Admin not found for update");
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    console.log("Admin Updated:", admin);
    res.json(admin);
  } catch (error) {
    console.error("Update Admin Error:", getErrorMessage(error));
    res.status(500).json({ error: getErrorMessage(error) });
  }
};

// Delete admin
export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Delete Admin ID:", id);
    const deleted = await AdminModel.findByIdAndDelete(id);
    if (!deleted) {
      console.log("Admin not found for deletion");
      res.status(404).json({ error: "Admin not found" });
      return;
    }
    console.log("Admin Deleted:", deleted);
    res.json({ message: "Admin deleted" });
  } catch (error) {
    console.error("Delete Admin Error:", getErrorMessage(error));
    res.status(500).json({ error: getErrorMessage(error) });
  }
};
