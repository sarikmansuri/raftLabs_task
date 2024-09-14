const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler.middleware");
require("./config");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(logger);

const authRoutes = require("./routes/auth.route");
const dataRoutes = require("./routes/data.route");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
