const chatModel = require("../models/chatModel");
// @desc Create chat
// @route Post /api/chats/
// @access private
const createChatService = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      // $all operator selects the documents where the value of a field is an array that contains all the specified elements.
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = new chatModel({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc find user chat
// @route Get /api/chats/:userId
// @access private
const findUserChatsService = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await chatModel.find({
      // $in operator selects the documents where the value of a field equals any value in the specified array.
      members: { $in: [userId] },
    });

    return res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Find chat
// @route Get /api/chats/find/:firstId/:secondId
// @access private
const findChatService = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await chatModel.find({
      // $all operator selects the documents where the value of a field is an array that contains all the specified elements.
      members: { $all: [firstId, secondId] },
    });

    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createChatService,
  findUserChatsService,
  findChatService,
};
