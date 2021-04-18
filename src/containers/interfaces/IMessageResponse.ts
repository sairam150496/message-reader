import { IMessageBody } from "./IMessageBody";

export interface IMessageResponse {
  count: number;
  pageToken: string;
  messages: Array<IMessageBody>;
}
