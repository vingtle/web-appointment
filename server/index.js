// Load environment variables from .env file
require("dotenv").config();
console.log(process.env.APP_SECRET);

const credentials = require("./app/credentials");
// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
require("./database/client").checkConnection();

// Import the Express application from app/config.js
const app = require("./app/config");

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Log credentials for debugging (remove in production)
console.log("Google Client ID:", credentials.google.client_id);

// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });



