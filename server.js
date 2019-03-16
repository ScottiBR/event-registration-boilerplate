const app = require("./server/serverApp");
const http = require("http");
http.createServer(app).listen(process.env.PORT || 3000);
