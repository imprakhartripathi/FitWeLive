import mongoose, { Schema, Document } from "mongoose";

export interface ITicket extends Document {
  generatedBy: string;
  generatorEmail: string;
  generatorPhone: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const TicketSchema = new Schema<ITicket>(
  {
    generatedBy: { type: String, required: true },
    generatorEmail: { type: String, required: true },
    generatorPhone: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITicket>("Ticket", TicketSchema);
