const express = require("express");
const { productSchema } = require("../helpers/schema_vallidations");

const auth = require("../middlewares/auth");

const {Product} = require("../models");
const router = express.Router();


//  CREATE PRODUCT
router.post("/", auth, async (req, res) => {
  console.log("Creating product with data:", req.body,req.user);
  try {
 
    const { error,value } = productSchema(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });}
  
      const checkProduct = await Product.findOne({
        where: {
          sku:value.sku,
          organizationId: req.user.organizationId,
        },
      }
    );
      if (checkProduct) {
        return res.status(400).json({
          success: false,
          message: "Product with this SKU already exists",
        })

      };

    const product = await Product.create({
      ...value,
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

    await product.update(value);

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

router.patch("/:id/adjust-stock", auth, async (req, res) => {
  try {
    const { change } = req.body;

    if (typeof change !== "number") {
      return res.status(400).json({
        message: "Change must be a number (+/-)",
      });
    }

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        organizationId: req.user.organizationId,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Update quantity
    product.quantity += change;

    if (product.quantity < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    // Optional tracking
    product.lastUpdatedBy = req.user.userId;

    await product.save();

    res.json({
      message: "Stock updated successfully",
      data: {
        id: product.id,
        quantity: product.quantity,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;