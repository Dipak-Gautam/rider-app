import { Dispatch } from "react";
import { userEndPoint } from "../../ApiServices/endpoints";
import SecureFetch from "../../ApiServices/SecureFetch";
import { IUserProp } from "../../Schema/user.schema";

const getData = async (
  token: string | null,
  setUserData: Dispatch<React.SetStateAction<IUserProp | undefined>>
) => {
  const request = await SecureFetch({
    url: `${userEndPoint}/profile`,
    header: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  const response = await request.json();
  if (request.status == 200) {
    setUserData(response.data);
  }
};
export default getData;
