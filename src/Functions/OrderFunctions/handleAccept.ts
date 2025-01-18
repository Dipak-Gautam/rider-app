import AsyncStorage from "@react-native-async-storage/async-storage";
import { mainEndpoint } from "../../ApiServices/endpoints";
import SecureFetch from "../../ApiServices/SecureFetch";
import { IOrderprop } from "../../Schema/orders.chema";
import { router } from "expo-router";

const handleAccept = async (
  rowKey: string,
  order: IOrderprop,
  setLock: React.Dispatch<React.SetStateAction<boolean>>,
  token: string | null
) => {
  setLock(true);
  const formData = {
    id: rowKey,
  };
  const request = await SecureFetch({
    url: `${mainEndpoint}/order/delete`,
    header: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "DELETE",
    body: JSON.stringify(formData),
  });
  if (request.status == 200) {
    await AsyncStorage.setItem("orderProgress", "true");
    await AsyncStorage.setItem("orderData", JSON.stringify(order));
    router.replace({
      pathname: "/HomeApp/ProgressOrder",
      params: { orderData: JSON.stringify(order) },
    });
  }
  setLock(false);
};

export default handleAccept;
