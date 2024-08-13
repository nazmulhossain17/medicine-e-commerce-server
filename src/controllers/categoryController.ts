import { Request, Response } from "express";
import categoryModel from "../models/categoryModel";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, thumbnail, parentCategory, level } = req.body;

    const newCategory = new categoryModel({
      name,
      slug,
      thumbnail,
      parentCategory: parentCategory || null,
      level,
    });

    await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryModel
      .find()
      .populate("parentCategory")
      .exec();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryModel
      .findById(id)
      .populate("parentCategory")
      .exec();

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ category });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedCategory = await categoryModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedCategory = await categoryModel.findByIdAndDelete(id).exec();

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
};
