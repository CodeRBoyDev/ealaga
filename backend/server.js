const app = require('./app')
const connectDatabase = require('./config/database')
const mongoose = require('mongoose');
// const cloudinary = require('cloudinary')
const cloudinary = require('cloudinary')

const dotenv = require('dotenv');

dotenv.config({path: 'backend/config/config.env'})

// if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => {
	console.log(`server started on port:' ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});


const io = require("socket.io")(server, {
    pingTimeout: 120000,
    cors: {
      // origin: "http://localhost:3000", //development
      // origin: "https://ealaga-server.onrender.com", //deployment
      // origin: "https://ealaga.vercel.app", //deployment
      origin: "https://staging-ealaga.vercel.app/", //deployment
      

      credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
  
    socket.on("setup", (userData) => {
      socket.join(userData?._id);
      console.log(`Logged in user ${userData?.first_name} joined the created room`);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined the selectedChat Room: " + room);//room-selectedChatId
    });
    
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
        //.in-- inside user._id exclusive socket room joined-- emit this "message recieved" event ////mern-docs
  
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  
  });  