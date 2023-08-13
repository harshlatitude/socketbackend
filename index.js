const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import the CORS middleware

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors()); // Use the CORS middleware to allow cross-origin requests
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
    res.status(200).json("server starts")
})

io.on("connection", (socket) => {
  console.log("User connected");

  // Listen for "customObject" event from client
  socket.on("customObject", (customData) => {
    // Emit the received custom object to all connected clients
    io.emit("customObject", customData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
