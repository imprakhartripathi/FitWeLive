import mongoose, { Schema, Document } from "mongoose";

export interface INotificationUser extends Document {
  fullName: string;
  email: string;
  contactNumber: string;
  description?: string;
  service: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const NotificationUserSchema = new Schema<INotificationUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    description: { type: String, default: null },
    service: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<INotificationUser>(
  "NotificationUser",
  NotificationUserSchema
);
