const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/user");
const Chat = require("../models/chatModel");
const swearjar = require('swearjar');

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected

const allMessages = asyncHandler(async (req, res) => {

  try {
    
    //:chatId in routes //request params
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "first_name profile_picture.url last_name email")
      .populate("chat");

    res.json(messages);
    
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected

const sendMessage = asyncHandler(async (req, res) => {

  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  //schema 
  var newMessage = {
    sender: req.user._id,
    content: swearjar.censor(content),
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    //populating the instance
    message = await message.populate("sender", "first_name",);
    message = await message.populate("chat");

    //populating with the user in that chat field of our message doc instance
    message = await User.populate(message, {
      path: "chat.users",
      select: "first_name last_name email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };