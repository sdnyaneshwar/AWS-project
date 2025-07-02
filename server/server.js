import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js"; 
dotenv.config();

const app = express();
app.use(cors(
  {
    origin: "http://localhost:3000",
  }
));
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", enquiryRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
