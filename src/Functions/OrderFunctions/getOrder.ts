import { mainEndpoint } from "../../ApiServices/endpoints";
import SecureFetch from "../../ApiServices/SecureFetch";
import hasNewElements from "../../Components/Functions/newElement";
import sendNotification from "./SendNotification";

const getOrder = async (
  token: string | null,
  prevOrders: React.MutableRefObject<never[]>,
  setOrders: React.Dispatch<React.SetStateAction<never[]>>
) => {
  const request = await SecureFetch({
    url: `${mainEndpoint}/order/all`,
    header: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  const response = await request.json();

  if (request.status == 200) {
    const temp = hasNewElements(prevOrders.current, response);
    if (temp == true) {
      sendNotification();
    }
    setOrders(response);
    prevOrders.current = response;
  }
};

export default getOrder;
