const express = require("express");
const { Product } = require("../models");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const orgId = req.user.organizationId;

    const products = await Product.findAll({
      where: { organizationId: orgId },
    });

    // totals
    const totalProducts = products.length;

    const totalQuantity = products.reduce(
      (sum, p) => sum + p.quantity,
      0
    );

    //  default threshold
    const defaultThreshold = 5;

    const lowStockItems = products
    .filter(p => p.quantity <= (p.lowStockThreshold ?? defaultThreshold))
    .map(p => ({
      name: p.name,
      sku: p.sku,
      quantity: p.quantity,
      lowStockThreshold: p.lowStockThreshold ?? defaultThreshold,
    }));

    //  response
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched",
      data: {
        totalProducts,
        totalQuantity,
        lowStockItems,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;