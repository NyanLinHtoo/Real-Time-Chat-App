const messageModel = require("../models/messageModel");
// @desc Create message
// @route Post /api/messages/
// @access private
const createMessageService = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });

  try {
    const response = await message.save();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc get message
// @route Get /api/messages/:chatId
// @access private
const getMessagesService = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await messageModel.find({ chatId });
    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createMessageService, getMessagesService };
