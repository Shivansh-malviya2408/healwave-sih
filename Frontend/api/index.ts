import { createServer } from "../server";
import serverless from "serverless-http";

// Create the Express app
const app = createServer();

// Export a serverless handler compatible with Vercel Functions
export default serverless(app);
