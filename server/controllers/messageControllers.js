const {
  createMessageService,
  getMessagesService,
} = require("../services/messageServices");

const createMessage = (req, res) => {
  createMessageService(req, res);
};

const getMessages = (req, res) => {
  getMessagesService(req, res);
};

module.exports = { createMessage, getMessages };
