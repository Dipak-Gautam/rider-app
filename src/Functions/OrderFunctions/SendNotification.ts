import * as Notifications from "expo-notifications";
const sendNotification = async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Delevery Avialiable",
        body: "Order are waiting for you please accept the orders",
        sound: "default",
      },
      trigger: null,
    });
    console.log("Notification sent manually.");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
export default sendNotification;
