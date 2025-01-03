import { IOrderprop } from "../../Schema/orders.chema";

function hasNewElements(initialArray: IOrderprop[], finalArray: IOrderprop[]) {
  const initialIds = new Set(initialArray.map((item) => item._id));

  return finalArray.some((item) => !initialIds.has(item._id));
}
export default hasNewElements;
