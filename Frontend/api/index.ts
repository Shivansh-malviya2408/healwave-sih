import { createServer } from "../server";

// Create the Express app
const app = createServer();

// Export the handler for Vercel serverless functions
export default app;
