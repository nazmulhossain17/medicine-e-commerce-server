import mongoose, { Document, Schema } from "mongoose";

export interface IVariant extends Document {
  name: string;
  price: number;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  photos: string[];
  description: string;
  metaKey: string;
  price: number;
  discount: number;
  stockStatus: boolean;
  status: boolean;
  categories: mongoose.Schema.Types.ObjectId[]; // Array of category IDs (Primary, Secondary, Tertiary)
  variants: IVariant[];
}

const VariantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    metaKey: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    stockStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    variants: {
      type: [VariantSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
