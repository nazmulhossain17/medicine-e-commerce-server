import { Request, Response } from "express";
import productModel from "../models/productModel";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      photos,
      description,
      metaKey,
      price,
      discount,
      stockStatus,
      status,
      categories,
      variants,
    } = req.body;

    const newProduct = new productModel({
      name,
      slug,
      photos,
      description,
      metaKey,
      price,
      discount,
      stockStatus,
      status,
      categories,
      variants,
    });

    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.find().populate("categories").exec();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productModel
      .findById(id)
      .populate("categories")
      .exec();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await productModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedProduct = await productModel.findByIdAndDelete(id).exec();

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};
