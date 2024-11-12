const dotenv = require("dotenv");
const http = require("http");
dotenv.config({ path: "./.env" });

const app = require("./app");

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
