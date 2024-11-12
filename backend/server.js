const dotenv = require("dotenv");
const http = require("http");
dotenv.config({ path: "./.env" });

const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT, "127.0.0.1", () => {
  console.log(`listening on ${process.env.PORT}`);
});
