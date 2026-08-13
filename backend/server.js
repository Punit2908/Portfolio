import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import {
  contactLimiter,
} from "./src/middleware/rateLimit.middleware.js";
import adminRoutes from "./src/routes/admin.route.js";
import connectDB from "./src/config/db.js";
import contactRoutes from "./src/routes/contact.route.js";
import errorMiddleware from "./src/middleware/error.middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5050;



app.use(helmet());


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// ==================================================
// BODY PARSING
// ==================================================

app.use(express.json({ limit: "10kb" }));

// ==================================================
// REQUEST LOGGER
// ==================================================

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});


app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    timestamp: new Date().toISOString(),
  });
});

// ==================================================
// CONTACT ROUTES
// ==================================================

app.use(
  "/api/contact",
  contactLimiter,
  contactRoutes
);
app.use(
  "/api/admin",
  adminRoutes
);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});



app.use(errorMiddleware);


const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "❌ Failed to start server:",
      error.message
    );

    process.exit(1);
  }
};

startServer();