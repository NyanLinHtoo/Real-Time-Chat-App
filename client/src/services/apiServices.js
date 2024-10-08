import create from "./httpServices";

export const userService = create("/users");
export const chatService = create("/chats");
export const messageService = create("/messages");
