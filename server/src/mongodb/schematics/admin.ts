import mongoose, { Schema, Document, Types } from "mongoose";
import { ITicket, TicketSchema } from "./tickets";

export interface ITicketSubdoc {
  _id: mongoose.Types.ObjectId;
  generatedBy: string;
  generatorEmail: string;
  generatorPhone: string;
  dob: Date; // <-- required Date here
  description: string;
  isResolved: boolean;
}

export const TicketSubdocSchema = new Schema<ITicketSubdoc>({
  generatedBy: { type: String, required: true },
  generatorEmail: { type: String, required: true },
  generatorPhone: { type: String, required: true },
  dob: { type: Schema.Types.Date, required: true },
  description: { type: String, required: true },
  isResolved: { type: Boolean, required: true, default: false }
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

  // Embeds TicketSchema, now with dob included
  tickets: [TicketSubdocSchema],
});

export default mongoose.model<IAdmin>("Admin", AdminSchema);
