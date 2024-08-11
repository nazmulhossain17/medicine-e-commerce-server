import mongoose, { Document, Schema } from "mongoose";

export interface IVerify extends Document {
  user: mongoose.Types.ObjectId;
  code: number;
  expiresAt: Date;
}

const verifySchema = new Schema<IVerify>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 3600, // Code expires in 1 hour
    },
  },
  { timestamps: true }
);

const Verify = mongoose.model<IVerify>("Verify", verifySchema);
export default Verify;
