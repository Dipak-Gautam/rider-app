import { ILocationProp } from "./location.schema";

export interface IOrderprop {
  _id: string;
  customerName: string;
  dropLocation: ILocationProp;
  items: string[];
  otpCode: string;
  paymentMethod: string;
  paymentStatus: boolean;
  phoneNumber: string;
  price: number;
  pickup: ILocationProp;
}
