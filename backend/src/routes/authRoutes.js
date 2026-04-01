const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, Organization } = require("../models");
const jwt = require("jsonwebtoken");
const { signup, loging } = require("../helpers/schema_vallidations");
const { or } = require("sequelize");

// Signup
router.post("/signup", async (req, res) => {

  try {
     const { error,value } = signup(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });}
  const { name, email, password, organizationName } = value;

    // Check user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check org
    let organization = await Organization.findOne({
      where: { name: organizationName },
    });

    if (!organization) {
      organization = await Organization.create({ name: organizationName });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      organizationId: organization.id,
    });

console.log(user,"------------");
    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login

router.post("/login", async (req, res) => {
    try {
        const { error ,value} = loging(req.body);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });}
      const { email, password } = value;
  
      // 🔥 JOIN User + Organization
      const user = await User.findOne({
        where: { email },
        include: [
          {
            model: Organization,
            attributes: ["id", "name"],
          },
        ],
      });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // ✅ Token with org name
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          organization: user.Organization?.name,
          organizationId: user.Organization?.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({
        message: "Login successful",
        token
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;