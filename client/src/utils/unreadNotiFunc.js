export const unreadNotiFunc = (notifications) => {
  return notifications.filter((noti) => noti.isRead === false);
};
