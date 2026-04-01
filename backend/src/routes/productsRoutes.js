const express = require("express");
const { productSchema } = require("../helpers/schema_vallidations");

const auth = require("../middlewares/auth");

const {Product} = require("../models");
const router = express.Router();


//  CREATE PRODUCT
router.post("/", auth, async (req, res) => {
  console.log("Creating product with data:", req.body,req.user);
  try {
 
    const { error } = productSchema(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });}

    const product = await Product.create({
      ...req.body,
      organizationId: req.user.organizationId,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// GET ALL PRODUCTS
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { organizationId: req.user.organizationId },
    });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


// GET SINGLE PRODUCT
router.get("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        organizationId: req.user.organizationId,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


//  UPDATE PRODUCT
router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = productSchema(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        organizationId: req.user.organizationId,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


//  DELETE PRODUCT
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
        organizationId: req.user.organizationId,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.destroy();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;