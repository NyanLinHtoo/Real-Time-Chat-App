const {
  createChatService,
  findUserChatsService,
  findChatService,
} = require("../services/chatServices");

const createChat = (req, res) => {
  createChatService(req, res);
};

const findUserChats = (req, res) => {
  findUserChatsService(req, res);
};

const findChat = (req, res) => {
  findChatService(req, res);
};

module.exports = { createChat, findUserChats, findChat };
