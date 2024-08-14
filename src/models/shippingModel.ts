import mongoose, { Document, Schema } from "mongoose";

interface IShippingAddress extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  division: string;
  district: string;
  subDistrict: string;
  address: string;
  name: string;
  phone: string;
  paymentMethod: "Online Payment" | "Cash on Delivery";
  products: string[]; // Add products field as an array of strings
}

const ShippingAddressSchema: Schema<IShippingAddress> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    subDistrict: { type: String, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["Online Payment", "Cash on Delivery"],
      required: true,
    },
    products: {
      type: [String], // Define as an array of strings
      required: true, // Adjust this if needed
    },
  },
  { timestamps: true }
);

const ShippingAddress = mongoose.model<IShippingAddress>(
  "ShippingAddress",
  ShippingAddressSchema
);

export default ShippingAddress;
