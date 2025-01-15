import * as Notifications from "expo-notifications";
const sendNotification = async () => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Delivery Available",
        body: "Order are waiting for you please accept the orders",
        sound: "default",
      },
      trigger: null,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
export default sendNotification;
