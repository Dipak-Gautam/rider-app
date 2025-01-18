import AsyncStorage from "@react-native-async-storage/async-storage";
import { IOrderprop } from "../Schema/orders.chema";
import SecureFetch from "./SecureFetch";
import { mainEndpoint } from "./endpoints";

const postDeliveryApi = async (token: string | null) => {
  console.log(" i am called");
  let tempData = await AsyncStorage.getItem("orderData");
  if (tempData == null) return;
  const orderData: IOrderprop = JSON.parse(tempData);
  const formData = {
    orderedBy: orderData.customerName,
    price: orderData.price,
    paymentMethod: orderData.paymentMethod,
  };
  const request = await SecureFetch({
    url: `${mainEndpoint}/delivery`,
    header: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  console.log("request", request);
  if (request.status == 200) {
    await AsyncStorage.removeItem("orderData");
    await AsyncStorage.removeItem("unSyncOrders");
  }
};
export default postDeliveryApi;
