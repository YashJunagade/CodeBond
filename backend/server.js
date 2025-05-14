require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Global unhandled promise rejection handler
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  process.exit(1);
});

// Set port for the API server
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Handle server errors
server.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  process.exit(1);
});
