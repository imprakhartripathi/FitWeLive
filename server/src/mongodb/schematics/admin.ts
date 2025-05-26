import mongoose, { Schema, Document, Types } from "mongoose";
import { ITicket, TicketSchema } from "./tickets";

export interface ITicketSubdoc extends Document {
  generatedBy: string;
  generatorEmail: string;
  generatorPhone: string;
  description: string;
  isResolved: boolean;
}

const TicketSubSchema = new Schema<ITicketSubdoc>({
  generatedBy: { type: String, required: true },
  generatorEmail: { type: String, required: true },
  generatorPhone: { type: String, required: true },
  description: { type: String, required: true },
  isResolved: { type: Boolean, default: false },
});

export interface IAdmin extends Document {
  fullName: string;
  email: string;
  password: string;
  imageURL: string;
  contactNumber: number;
  sex: string;
  notificationsOn: boolean;
  emailNotificationsOn: boolean;
  tickets: Types.DocumentArray<ITicketSubdoc>;
}

const AdminSchema = new Schema<IAdmin>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  imageURL: { type: String, default: null },
  contactNumber: { type: Number, default: null },
  sex: { type: String, default: null },
  notificationsOn: { type: Boolean, default: true },
  emailNotificationsOn: { type: Boolean, default: true },

  // Embeds TicketSchema, not just ObjectId
   tickets: [TicketSubSchema],
});

export default mongoose.model<IAdmin>("Admin", AdminSchema);
