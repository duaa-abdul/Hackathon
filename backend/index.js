import express from "express";
import dotenv from "dotenv";
import cors from "cors"; //extra
import dbConnection from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { router as hijabRoutes } from "./routes/hijabRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";


const app = express();
dotenv.config();
dbConnection();
app.use(express.json());
app.use(cors()); //extra

app.use("/api/auth", authRoutes);

// app.use("/api/styles", hijabRoutes);
app.use("/api/hijabstyles", hijabRoutes);
app.use("/api/reviews", reviewRoutes);
app.get("/" , (req , res)=>{
  res.sendres.send("hello")
})
// app.use("/api/styless", styleRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Exampl
  e app listening on port ${process.env.PORT}!`)
  
);