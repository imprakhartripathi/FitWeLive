import mongoose, { Schema, Document } from "mongoose";
import { ITicket, TicketSchema } from "./tickets";


export interface IAdmin extends Document {
  fullName: string;
  email: string;
  password: string;
  imageURL: string;
  contactNumber: number;
  sex: string;
  notificationsOn: boolean;
  emailNotificationsOn: boolean;
  tickets: ITicket[];
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
  tickets: { type: [TicketSchema], default: [] },
});

export default mongoose.model<IAdmin>("Admin", AdminSchema);
