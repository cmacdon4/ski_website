import Parse from "parse/dist/parse.min.js";
import env from "./environments.js";

// Initialize Parse connection
Parse.initialize(env.APPLICATION_ID, env.JAVASCRIPT_KEY);
Parse.serverURL = env.SERVER_URL;

export default Parse;
