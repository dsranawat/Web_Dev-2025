const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Function to create admin user if not exists
const createAdmin = async () => {
  try {
    const existing = await User.findOne({ username: "admin" });
    if (!existing) {
      const hashed = await bcrypt.hash("admin123", 10);
      const admin = new User({ username: "admin", password: hashed });
      await admin.save();
      console.log("✅ Admin created: admin / admin123");
    } else {
      console.log("✅ Admin already exists.");
    }
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
};

// 🚀 Connect to DB and start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await createAdmin(); // ⬅️ Call the admin creation function
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
