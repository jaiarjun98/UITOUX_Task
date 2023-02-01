import Server from "./server/server.js";
const port = process.env.PORT || 5000;
export default new Server().listen(port);

