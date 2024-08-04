import * as Notifications from "expo-notifications";

const schedule = async ({ id, title, body, date }) => {
  return await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: {
      title,
      body,
    },
    trigger: date,
  });
};

const cancel = async (id) => {
return await Notifications.cancelScheduledNotificationAsync(id);
  
};

const cancelAll = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export default SchedulerService = {
  schedule,
  cancel,
  cancelAll,
};
