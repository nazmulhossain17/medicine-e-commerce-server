import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  thumbnail: string;
  parentCategory?: mongoose.Schema.Types.ObjectId; // Reference to the parent category (if any)
  level: number; // 1 for Primary, 2 for Secondary, 3 for Tertiary
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    level: {
      type: Number,
      required: true,
      enum: [1, 2, 3], // 1 for Primary, 2 for Secondary, 3 for Tertiary
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
